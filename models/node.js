/**
 * @file Define node pattern
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

const { scaleLinear } = require('d3-scale');

const Config = require('./config');

module.exports = class Node {
  /**
   * @param {number} linksNb
   * @param {number} backlinksNb
   * @param {[number, number]} linksExtent
   * @param {[number, number]} backlinksExtent
   * @param {number} minRange
   * @param {number} maxRange
   * @returns
   */

  static getNodeSizeByLinkRank(
    linksNb,
    backlinksNb,
    linksExtent,
    backlinksExtent,
    minRange,
    maxRange
  ) {
    const [minLinks, maxLinks] = linksExtent;
    const [minBacklinks, maxBacklinks] = backlinksExtent;

    var size = scaleLinear()
      .domain([minLinks + minBacklinks, maxLinks + maxBacklinks])
      .range([minRange, maxRange]);

    return size(linksNb + backlinksNb);
  }

  /**
   * @param {Config} config
   * @param {string} nodeType
   * @returns {object}
   */

  static getNodeStyle(config, nodeType) {
    if (!config || config instanceof Config === false) {
      throw new Error('Need instance of Config to process');
    }
    const format = config.getFormatOfTypeRecord(nodeType);
    let fill;
    switch (format) {
      case 'image':
        fill = `url(#${config.opts['record_types'][nodeType]['fill']})`;
        break;
      case 'color':
      default:
        fill = config.opts['record_types'][nodeType]['fill'];
        break;
    }
    return {
      fill,
      colorStroke: config.opts['record_types'][nodeType]['stroke'],
      highlight: config.opts['graph_highlight_color'],
    };
  }

  /**
   * For each file, get the connection levels
   * The first connection level contains all nodes that are directly linked to the file
   * as link or backlink
   * The second connection level contains all nodes that are connected to the first one
   * and so forth
   * @param {number} nodeId
   * @param {Record[]} records
   * @param {number} [maxLevel = 2]
   * @returns {array[]} - Array of files objets
   */

  static evalConnectionLevels(nodeId, records, maxLevel = 2) {
    let focusLevels = [];

    let index = [], // store all levels
      idsList = new Set(); // contains all handled node ids

    index.push([nodeId]); // add the node as "zero" level

    for (let i = 0; i < maxLevel; i++) {
      let level = []; // store nodes id of the level

      for (const target of index[index.length - 1]) {
        // searching connections for each nodes from the last indexed level
        let result = getConnectedIds(target, records);

        if (result === false) {
          // if the connected node have not connections, analyse the next one
          continue;
        }

        // ignore ids already registered into another level to avoid infinity loop
        result = result.filter((target) => idsList.has(target) === false);

        level = level.concat(result);
      }

      if (level.length === 0) {
        // Stop the analysis : the current level contain any connection. It is not stored.
        break;
      }

      // ignore duplicated ids
      level = deleteDupicates(level);

      index.push(level);
      idsList = new Set(index.flat());
    }

    focusLevels = index.slice(1); // ignore level "zero"

    /**
     * Get the id of the connected nodes
     * @param {number} nodeId
     * @returns {array} - Ids of the connected nodes (by link or backlink)
     */

    function getConnectedIds(nodeId, records) {
      let sources = records
        .find((record) => record.id === nodeId)
        .links.map((link) => link.target.id);

      let targets = records
        .find((record) => record.id === nodeId)
        .backlinks.map((backlink) => backlink.source.id);

      targets = targets.concat(sources);

      if (targets.length === 0) {
        return false;
      }

      return targets;
    }

    return focusLevels;
  }

  /**
   * @param {Record[]} records
   * @param {Graph.stats} graphStats
   * @returns {Node[]}
   */

  static getNodesFromRecords(records, { linksExtent, backlinksExtent }) {
    return records.map((record) => {
      const { id, title, type, links, backlinks, begin, end, thumbnail, config } = record;
      const { fill, colorStroke, highlight } = Node.getNodeStyle(config, type[0]);
      const { node_size_method, node_size, node_size_min, node_size_max } = config.opts;
      let size;
      switch (node_size_method) {
        case 'unique':
          size = node_size;
          break;
        case 'degree':
          size = Node.getNodeSizeByLinkRank(
            links.length,
            backlinks.length,
            linksExtent,
            backlinksExtent,
            node_size_min,
            node_size_max
          );
          break;
      }
      return new Node(
        id,
        title,
        type[0],
        !!thumbnail ? `url(#${thumbnail})` : fill,
        colorStroke,
        highlight,
        size,
        2,
        begin,
        end
      );
    });
  }

  /**
   * @param {number} id
   * @param {string} label
   * @param {string} type
   * @param {string} fill Color of the center
   * @param {string} colorStroke Color of the border
   * @param {string} colorHighlight Color on highlight
   * @param {number} size
   * @param {number} strokeWidth
   * @param {array} focus
   * @param {number} begin
   * @param {number} end
   */

  constructor(
    id,
    label,
    type = 'undefined',
    fill,
    colorStroke,
    highlight,
    size,
    strokeWidth,
    begin,
    end
  ) {
    this.id = Number(id);
    this.label = label;
    this.type = type;
    this.fill = fill;
    this.colorStroke = colorStroke;
    this.highlight = highlight;
    this.size = Number(size);
    this.strokeWidth = strokeWidth;
    this.begin = begin;
    this.end = end;
  }
};

/**
 * Delete duplicated elements from an array
 * @param {array} array - Array with duplicated elements
 * @return {array} - Array without duplicated elements
 */

function deleteDupicates(array) {
  if (array.length < 2) {
    return array;
  }

  return array.filter((item, index) => {
    return array.indexOf(item) === index;
  });
}

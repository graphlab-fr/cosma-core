/**
 * @file Opensphère generator
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

/**
 * @typedef Item
 * @type {object}
 * @property {string} label Display as a title
 * @property {string} body Display as a body text
 */

const Config = require('./config')
    , Graph = require('./graph')
    , Bibliography = require('./bibliography')
    , Link = require('./link')
    , Node = require('./node')
    , Record = require('./record');

module.exports = class Opensphere extends Graph {
    /**
     * @param {Object[]} recordsData
     * @param {Link[]} links
     * @param {Config} config
     * @returns {Record[]}
     */

    static formatArrayRecords(recordsData, links, config) {
        const { record_types: recordTypes } = config.opts;

        const nodes = recordsData.map(({ id, title, ...rest }) => {
            let type;
            for (const [key, value] of Object.entries(rest)) {
                const [field, label] = key.split(':', 2);
                switch (field) {
                    case 'type':
                        if (type === undefined) { type = value; }
                        recordTypes[value] = recordTypes[value] || recordTypes['undefined'];
                        break;
                }
            }
            return new Node(
                id,
                title,
                type
            );
        });

        return recordsData.map(({ title, id, ...rest }) => {
            let contents = [], types = [], metas = {}, tags = [], quotes = [];
            for (const [key, value] of Object.entries(rest)) {
                const [field, label] = key.split(':', 2);
                if (field === 'time' || field === 'image') { continue; }
                switch (field) {
                    case 'content':
                        contents.push([`<h3>${label}</h3>`, value]);
                        break;
                    case 'type':
                        types.push(value);
                        break;
                    case 'tag':
                        tags.push(value);
                        break;
                    case 'quote':
                        quotes = value.split(',');
                        break;
                    case 'meta':
                    default:
                        metas[label] = value;
                        break;
                }
            }

            const content = contents
                .map((content) => content.join('\n\n'))
                .join('\n\n');

            const {
                linksReferences,
                backlinksReferences
            } = Link.getReferencesFromLinks(Number(id), links, nodes);
            const bibliographicRecords = Bibliography.getBibliographicRecordsFromList(quotes);

            const record = new Record(
                id,
                title,
                types,
                tags,
                metas,
                content,
                linksReferences,
                backlinksReferences,
                rest['time:begin'],
                rest['time:end'],
                bibliographicRecords,
                rest['image'],
                { record_types: recordTypes }
            );

            return record;
        })
    }

    /**
     * @param {Object[]} linksData
     * @returns {Link[]}
     */

    static formatArrayLinks(linksData) {
        return linksData.map(({ title, source, target }, i) => {
            const link = new Link(
                i,
                title,
                undefined,
                undefined,
                undefined,
                undefined,
                source,
                target
            );

            if (link.isValid()) { return link; }
            return undefined;
        })
    }

    /**
     * @param {Record[]} records
     * @param {Link[]} links
     * @param {Object} opts
     */

    constructor(records, opts) {
        super(records, opts);

        this.data.nodes = this.data.nodes.map((node) => {
            node.size = 10;
            return node;
        });
    }
}
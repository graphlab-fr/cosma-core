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
    , Link = require('./link')
    , Node = require('./node')
    , Record = require('./record');

const moment = require('moment');

module.exports = class Opensphere {
    /**
     * @param {Object[]} recordsData
     * @returns {Record[]}
     */

    static formatArrayRecords(recordsData, links) {
        const nodes = recordsData.map(({ id, title, ...rest }) => {
            let types = [];
            for (const [key, value] of Object.entries(rest)) {
                const [field, label] = key.split(':', 2);
                switch (field) {
                    case 'type':
                        types.push(value);
                        break;
                }
            }
            return new Node(
                id,
                title,
                types[0]
            );
        });

        return recordsData.map(({ title, id, image, ...rest }) => {
            let contents = [], types = [], metas = {}, tags = [];
            for (const [key, value] of Object.entries(rest)) {
                const [field, label] = key.split(':', 2);
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
            } = Opensphere.getReferencesFromLinks(Number(id), links, nodes);

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
                []
            );

            if (record.isValid()) { return record; }
            return undefined;
        })
    }

    /**
     * @param {number} nodeId
     * @param {Link[]} links
     * @param {Node[]} nodes
     * @returns {Reference[]}
     */

    static getReferencesFromLinks(nodeId, links, nodes) {
        const linksFromNodeReferences = links
            .filter(link => link.source === nodeId)
            .map(({ title, source: sourceId, target: targetId }) => {
                const { label: targetLabel, type: targetType } = nodes.find(n => n.id === targetId);
                const { label: sourceLabel, type: sourceType } = nodes.find(n => n.id === sourceId);
                return {
                    context: title,
                    source: {
                        id: sourceId,
                        title: sourceLabel,
                        type: sourceType
                    },
                    target: {
                        id: targetId,
                        title: targetLabel,
                        type: targetType
                    }
                }
            });
        const backlinksToNodeReferences = links
            .filter(link => link.target === nodeId)
            .map(({ title, source: sourceId, target: targetId }) => {
                const { label: targetLabel, type: targetType } = nodes.find(n => n.id === targetId);
                const { label: sourceLabel, type: sourceType } = nodes.find(n => n.id === sourceId);
                return {
                    context: title,
                    source: {
                        id: sourceId,
                        title: sourceLabel,
                        type: sourceType
                    },
                    target: {
                        id: targetId,
                        title: targetLabel,
                        type: targetType
                    }
                }
            });
        return {
            linksReferences: linksFromNodeReferences,
            backlinksReferences: backlinksToNodeReferences
        }
    }

    /**
     * @param {Object[]} linksData
     * @returns {Link[]}
     */

    static formatArrayLinks(linksData) {
        return linksData.map(({ title, source, target }, i) => {
            const link = new Link(i, title, undefined, undefined, undefined, source, target);

            if (link.isValid()) { return link; }
            return undefined;
        })
    }

    /**
     * @param {Record[]} records
     * @returns {string[]}
     */

    static getTypesFromRecords(records) {
        let typesBody = records.map(({ type }) => {
            return type;
        });
        typesBody = typesBody.flat();
        typesBody = new Set(typesBody);
        typesBody = Array.from(typesBody);
        return typesBody;
    }

    /**
     * @param {Record[]} records
     * @param {Link[]} links
     * @param {Object} opts
     */

    constructor(records, links, opts) {
        this.records = records;
        let nodes = this.records.map(({ id, title, type }) => {
            return new Node(
                id,
                title,
                type[0],
                3,
                Graph.evalConnectionLevels(id, records)
            );
        });
        // nodes = nodes.map(node => {
        //     node.focus = Graph.evalConnectionLevels(node.id, nodes);
        //     return node;
        // })
        this.data = {
            links,
            nodes
        };

        this.config = new Config(opts);
        const types = Opensphere.getTypesFromRecords(this.records);
        const typesFromConfig = new Set(Object.keys(this.config.opts.record_types));
        for (const type of types) {
            if (typesFromConfig.has(type)) {
                continue; }
            this.config.opts.record_types[type] = this.config.opts.record_types['undefined'];
        }
    }
}
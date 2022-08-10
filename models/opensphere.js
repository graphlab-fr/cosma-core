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


// const fs = require('fs')
//     , path = require('path');

const Config = require('./config');

const moment = require('moment');

module.exports = class Opensphere {
    /**
     * @param {Object[]} recordsData
     * @returns {Record[]}
     */

    static formatArrayRecords(recordsData) {
        return recordsData.map(({ title, id, image, ...rest }) => {
            let content = [], types = [], metas = [], tags = [];
            for (const [key, value] of Object.entries(rest)) {
                const [field, label] = key.split(':', 2);
                switch (field) {
                    case 'content':
                        content.push({ label, body: value });
                        break;
                    case 'type':
                        types.push({ label, body: value });
                        break;
                    case 'tag':
                        tags.push({ label, body: value });
                        break;
                    case 'meta':
                    default:
                        metas.push({ label, body: value });
                        break;
                }
            }

            const record = new Record(
                title,
                id,
                content,
                types,
                metas,
                tags,
                rest['time:begin'],
                rest['time:end'],
                image
            )

            if (record.isValid()) { return record; }
            return undefined;
        })
    }

    /**
     * @param {Object[]} linksData
     * @returns {Link[]}
     */

    static formatArrayLinks(linksData) {
        return linksData.map(({ title, source, target }) => {
            const link = new Link(title, source, target)

            if (link.isValid()) { return link; }
            return undefined;
        })
    }

    /**
     * @param {Record[]} records
     * @returns {string[]}
     */

    static getTypesFromRecords(records) {
        let typesBody = records.map(({ types }) => {
            return types.map(({ body }) => body);
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
        const nodes = 
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
            this.config.opts.record_types[type] = '#CCCCCC';
        }
        console.log(this.config.opts);
        // for (const [body, color] of Object.entries(this.config.opts.record_types)) {
        //     if (condition) {
                
        //     }
        // }
    }
}

class Record {
    /**
     * @param {string} title
     * @param {number} id
     * @param {Item[]} content
     * @param {Item[]} types
     * @param {Item[]} metas
     * @param {Item[]} tags
     * @param {string} timeBegin
     * @param {string} timeEnd
     * @param {string} image
     */

    constructor(title, id, content, types, metas, tags, timeBegin, timeEnd, image) {
        this.title = title;
        this.id = Number(id);
        this.content = content;
        this.types = types;
        this.metas = metas;
        this.tags = tags;
        this.timeBegin = !timeBegin ? undefined : moment(timeBegin).unix();
        this.timeEnd = !timeEnd ? undefined : moment(timeEnd).unix();
        this.image = image;

        this.report = [];
    }

    verif() {
        if (!this.title) { this.report.push('Invalid title'); }
        if (!this.id || isNaN(this.id)) { this.report.push('Invalid id'); }
        if (isValidList(this.content) === false) { this.report.push('Invalid content'); }
        if (isValidList(this.types) === false) { this.report.push('Invalid types'); }
        if (isValidList(this.metas) === false) { this.report.push('Invalid metas'); }
        if (isValidList(this.tags) === false) { this.report.push('Invalid tags'); }
        // this.timeBegin === NaN if moment(this.timeBegin).isValid() === false
        if (isNaN(this.timeBegin)) { this.report.push('Invalid time begin'); }
        if (isNaN(this.timeEnd)) { this.report.push('Invalid time end'); }
    }

    /**
     * @param {Item[]} list
     * @returns {boolean}
     */

    isValidList(list) {
        if (Array.isArray(list) === false) {
            return false;
        }
        for (const item of list) {
            if (!item['label'] || !item['body']) {
                return false;
            }
        }
    }

    /**
     * @returns {boolean}
     */

    isValid() {
        return this.report.length === 0;
    }
}

class Link {
    constructor(title, source, target) {
        this.title = title;
        this.source = Number(source);
        this.target = Number(target);

        this.report = [];
    }

    verif() {
        if (!this.title) { this.report.push('Invalid title'); }
        if (!this.source || isNaN(this.source)) { this.report.push('Invalid source'); }
        if (!this.target || isNaN(this.target)) { this.report.push('Invalid target'); }
    }

    /**
     * @returns {boolean}
     */

    isValid() {
        return this.report.length === 0;
    }
}
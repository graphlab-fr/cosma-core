/**
 * @file Cosmoscope generator
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

/**
 * @typedef File
 * @type {object}
 * @property {string} path
 * @property {string} name
 * @property {string} lastEditDate
 * @property {string} content
 * @property {FileMetas} metas
 */

/**
 * @typedef FileMetas
 * @type {object}
 * @property {number} id
 * @property {string} title
 * @property {string | string[] | undefined} type
 * @property {string[] | undefined} tags
 */

/**
 * @typedef LinkNormalized
 * @type {object}
 * @property {string} type
 * @property {object} target
 * @property {number} target.id
 */

const fs = require('fs')
    , path = require('path')
    , glob = require("glob")
    , ymlFM = require('yaml-front-matter')
    , CSL = require('citeproc')
    , Citr = require('@zettlr/citr');

const Graph = require('./graph')
    , Link = require('./link')
    , Record = require('./record')
    , Node = require('./node')
    , lang = require('./lang');

module.exports = class Cosmocope extends Graph {
    /**
     * @param {string} pathToFiles
     * @returns {File[]}
     */

    static getFromPathFiles(pathToFiles) {
        const filesPath = glob.sync('**/*.md', {
            cwd: pathToFiles
        }).map(file => path.join(pathToFiles, file))
        
        /** @type {File[]} */
        return filesPath.map((filePath) => {
            const fileContain = fs.readFileSync(filePath, 'utf8');
            const { __content: content, ...metas} = ymlFM.loadFront(fileContain);

            /** @type {File} */
            const file = {
                path: filePath,
                name: path.basename(filePath),
                lastEditDate: fs.statSync(filePath).mtime,
                content,
                metas
            };

            file.metas.type = file.metas.type || 'undefined';
            file.metas.tags =  file.metas['tags'] || file.metas['keywords'] || [];
            file.metas.id = Number(file.metas.id);
            return file;
        });
    }

    /**
     * @param {File[]} files
     * @param {object} opts
     * @returns {Record[]}
     */

    static getRecordsFromFiles(files, opts = {}) {
        const links = files.map((file) => {
            const { id } = file.metas;
            const { content } = file;
            return Link.getWikiLinksFromFileContent(id, content);
        }).flat();

        let nodes = files.map((file) => {
            let { id, title, type } = file.metas;
            return new Node(
                id,
                title,
                type,
                undefined,
                []
            );
        });

        const records = files.map((file) => {
            const { id, title, type, tags } = file.metas;
            const {
                linksReferences,
                backlinksReferences
            } = Link.getReferencesFromLinks(id, links, nodes);

            return new Record(
                id,
                title,
                type,
                tags,
                undefined,
                file.content,
                linksReferences,
                backlinksReferences,
                file.lastEditDate,
                undefined,
                undefined,
                opts
            );
        });

        return records;
    }

    constructor(records, opts, params) {
        super(records, opts, params);
    }
}
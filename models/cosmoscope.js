/**
 * @file Manage the file directory and its data to generate a graph
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
 * @property {string | string[] | 'undefined'} type
 * @property {string[]} tags
 * @property {string[]} references
 * @property {string | undefined} thumbnail
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
    , ymlFM = require('yaml-front-matter');

const Graph = require('./graph')
    , Config = require('./config')
    , Link = require('./link')
    , Record = require('./record')
    , Node = require('./node')
    , Bibliography = require('./bibliography');

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
            file.metas.references = file.metas.references || [];
            return file;
        });
    }

    /**
     * @param {File[]} files
     * @param {Config.opts} opts
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
            const { id, title, type, tags, thumbnail, references, ...rest } = file.metas;
            const {
                linksReferences,
                backlinksReferences
            } = Link.getReferencesFromLinks(id, links, nodes);
            const bibliographicRecords = [
                ...Bibliography.getBibliographicRecordsFromText(file.content),
                ...Bibliography.getBibliographicRecordsFromList(references)
            ];

            return new Record(
                id,
                title,
                type,
                tags,
                rest,
                file.content,
                linksReferences,
                backlinksReferences,
                file.lastEditDate,
                undefined,
                bibliographicRecords,
                thumbnail,
                opts
            );
        });

        return records;
    }

    /**
     * Get the index from which to create new records in the mass
     * The index depends on the identifier of the last record created in the mass
     * The index is obtained via the Graph analysis
     * @return {number}
     */

    static getIndexToMassSave () {
        const { files_origin: filesPath } = Config.get();
        const todayMassSavedRecordIds = Cosmocope.getFromPathFiles(filesPath) // get graph analyse
            .map(file => file.metas.id)
            .filter(Record.isTodayOutDailyId) // ignore not today mass saved records id
            .sort();

        // 'todayMassSavedRecordIds' can be empty
        let lastId = todayMassSavedRecordIds[todayMassSavedRecordIds.length - 1] || undefined;
        // 20220115246695 - 20220115246060 = 635, the index for the next record is 635 + 1
        return lastId - Record.generateOutDailyId() + 1 || 1;
    }

    constructor(records, opts, params) {
        super(records, opts, params);
    }
}
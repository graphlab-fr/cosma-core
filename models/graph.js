/**
 * @file Graph pattern
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

/**
 * @typedef Chronos
 * @type {object}
 * @property {number | undefined} begin
 * @property {number | undefined} end
 */

const Config = require('./config')
    , Link = require('./link')
    , Node = require('./node');

module.exports = class Graph {
    static validParams = new Set([
        'sample',
        'fake',
        'empty'
    ]);

    /**
     * 
     * @param {Record[]} records 
     * @param {object} opts 
     * @param {string[]} params 
     */

    constructor(records = [], opts = {}, params = []) {
        this.params = new Set(
            params.filter(param => Graph.validParams.has(param))
        );
        this.records = records;

        this.data = {
            nodes: Node.getNodesFromRecords(this.records),
            links: Link.getLinksFromRecords(this.records)
        };
        this.config = new Config(opts);

        /** @type {Chronos} */
        this.chronos = this.getChronosFromRecords();

        this.report = {
            // /** @exemple push object { fileName: '', invalidMeta: '' } */
            // ignored_files: [],
            // /** @exemple push object { fileName: '', type: '' } */
            // type_record_change: [],
            // /** @exemple push object { fileName: '', type: '' } */
            // type_link_change: [],
            // /** @exemple push object { fileName: '', targetId: '' } */
            // link_invalid: [],
            // /** @exemple push object { fileName: '', targetId: '' } */
            // link_no_target: [],
            // /** @exemple push object { fileName: '', quoteId: '' } */
            // quotes_without_reference: [],
            duplicates: [],
            brokenLinks: []
        };

        this.reportDuplicatedIds();
        this.reportBrokenLinks();
    }

    /**
     * Check if ids are all unique and report duplicated ones
     */

    reportDuplicatedIds() {
        const recordsIdAlreadyAnalysed = new Set();
        for (const { id, title } of this.records) {
            if (recordsIdAlreadyAnalysed.has(id)) {
                this.report.duplicates.push({ id, title });
                continue;
            }
            recordsIdAlreadyAnalysed.add(id);
        }
    }

    reportBrokenLinks() {
        const nodesId = new Set(this.data.nodes.map(({ id }) => id));
        for (const { id, context, source, target } of this.data.links) {
            if (nodesId.has(source) === false || nodesId.has(target) === false) {
                this.report.brokenLinks.push({ id, context });
            }
        }
    }

    /**
     * @returns {Chronos}
     */

    getChronosFromRecords() {
        let dates = [];
        for (const { begin, end } of this.records) {
            dates.push(begin);
            dates.push(end);
        }
        dates = dates.sort((a, b) => {
            if (a < b) { return -1; }
            if (a > b) { return 1; }
            return 0;
        }).filter(date => typeof date === 'number');
        return {
            begin: dates[0],
            end: dates[dates.length - 1]
        }
    }
}
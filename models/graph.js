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

const { extent } = require('d3-array');

const Config = require('./config')
    , Record = require('./record')
    , Link = require('./link')
    , Node = require('./node')
    , Report = require('./report');

module.exports = class Graph {
    static validParams = new Set([
        'sample',
        'fake',
        'empty'
    ]);

    /**
     * 
     * @param {Record[]} records 
     * @param {Config.opts} opts 
     * @param {string[]} params
     * @exemple
     * ```
     * const { files_origin: filesPath } = Config.get();
     * const files = Cosmoscope.getFromPathFiles(filesPath);
     * const records = Cosmoscope.getRecordsFromFiles(files, config.opts);   
     * const graph = new Cosmocope(records, config.opts, ['sample']);
     * ```
     */

    constructor(records = [], opts = {}, params = []) {
        this.params = new Set(
            params.filter(param => Graph.validParams.has(param))
        );
        this.records = records;

        this.stats = {
            linksExtent: extent(this.records, d => d.links.length),
            backlinksExtent: extent(this.records, d => d.backlinks.length)
        };

        this.data = {
            nodes: Node.getNodesFromRecords(this.records, this.stats),
            links: Link.getLinksFromRecords(this.records)
        };
        this.config = new Config(opts);

        /** @type {Chronos} */
        this.chronos = this.getChronosFromRecords();

        this.reportDuplicatedIds();
    }

    /**
     * Check if ids are all unique and report duplicated ones
     */

    reportDuplicatedIds() {
        const recordsIdAlreadyAnalysed = new Set();
        let lastRecordTitle;
        for (const { id, title } of this.records) {
            if (recordsIdAlreadyAnalysed.has(id)) {
                new Report(id, title, 'error').aboutDuplicatedIds(id, title, lastRecordTitle);
            }
            recordsIdAlreadyAnalysed.add(id);
            lastRecordTitle = title;
        }
    }

    /**
     * @returns {Chronos}
     */

    getChronosFromRecords() {
        let dates = [];
        for (const { begin, end } of this.records) {
            dates.push(begin, end);
        }
        const [begin, end] = extent(dates);
        return { begin, end };
    }
}
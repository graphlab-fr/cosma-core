/**
 * @file Cosmoscope generator
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

const fs = require('fs')
    , path = require('path')
    , glob = require("glob")
    , ymlFM = require('yaml-front-matter')
    , CSL = require('citeproc')
    , Citr = require('@zettlr/citr');

const Config = require('./config')
    , lang = require('./lang');

/**
 * Class to get the Cosmoscope data
 * from the config options and some parameters
 */

module.exports = class Graph {

    /**
     * List of valid Graph params
     * @static
     */

    static validParams = [
        'publish',
        'css_custom',
        'citeproc',
        'sample',
        'fake',
        'empty',
    ];

    /**
     * Catch links from Markdown file content
     * @param {string} link - String between '[[]]' square brackets from a record content
     * @returns {object} - link type & target id
     * @example for link '[[a:20200519215026]]' returns { type: a, target: {id: 20200519215026 } }
     * @static
     */

    static normalizeLinks (link) {
        link = link.split(':', 2);

        if (link.length === 2) {
            return { type: link[0], target: {id: (Number(link[1]) || link[1]) } }; }

        return { type: 'undefined', target: {id: (Number(link[0]) || link[0]) } };
    }

    /**
     * Get the node (file) size according to the sum of its links & backlinks
     * The sum is divide to reduce the size
     * @param {number} linksNb - number of links from a file
     * @param {number} backlinksNb - number of backlinks from a file
     * @returns {number} - node (file) size
     * @static
     */

    static getNodeRank (linksNb, backlinksNb) {
        let rank = 1 // original rank
            , sizeDivisor = 2; // to reduce rank

        rank += Math.floor(linksNb / sizeDivisor);
        rank += Math.floor(backlinksNb / sizeDivisor);

        return rank;
    }

    /**
     * The objects generated by this.catchQuoteKeys() are too deep
     * This function find for each quote entry all the included ids
     * @param {number} quoteObject - file.quotes object
     * @returns {array} - ids from quote entry
     * @static
     */

    static getQuoteKeysFromQuoteObject (quoteObject) {
        return Object.values(quoteObject)
            .map(function(key) {
                let ids = [];
    
                for (const cit of key) {
                    ids.push(cit.id);
                }
    
                return ids;
            })
            .flat();
    }

    /**
     * For the arrays contains in this.report object
     * make data object become strings
     * @returns {array} - Object of strings array
     */

    static reportToSentences (report) {
        let msg = [];

        if (report.ignored_files) {
            msg.push(
                lang.getFor(lang.i.graph_report['ignored_files'].head_message)
            );

            msg.push(
                report.ignored_files.map((data) => {
                    return lang.getWith(lang.i.graph_report['ignored_files'].item_message, [data.fileName, data.invalidMeta]);
                }).join('\n')
            );
        } 

        if (report.duplicates) {
            msg.push(
                lang.getFor(lang.i.graph_report['duplicates'].head_message)
            );

            msg.push(
                report.duplicates.map((data) => {
                    return lang.getWith(lang.i.graph_report['duplicates'].item_message, [data.id, data.files.join(', ')]);
                }).join('\n')
            );
        }

        if (report.type_record_change) {
            msg.push(
                lang.getFor(lang.i.graph_report['type_record_change'].head_message)
            );

            msg.push(
                report.type_record_change.map((data) => {
                    return lang.getWith(lang.i.graph_report['type_record_change'].item_message, [data.fileName]);
                }).join('\n')
            );
        }

        if (report.type_link_change) {
            msg.push(
                lang.getFor(lang.i.graph_report['type_link_change'].head_message)
            );

            msg.push(
                report.type_link_change.map((data) => {
                    return lang.getWith(lang.i.graph_report['type_link_change'].item_message, [data.fileName]);
                }).join('\n')
            );
        }

        if (report.link_invalid) {
            msg.push(
                lang.getFor(lang.i.graph_report['link_invalid'].head_message)
            );

            msg.push(
                report.link_invalid.map((data) => {
                    return lang.getWith(lang.i.graph_report['link_invalid'].item_message, [data.targetId, data.fileName]);
                }).join('\n')
            );
        }

        if (report.link_no_target) {
            msg.push(
                lang.getFor(lang.i.graph_report['link_no_target'].head_message)
            );

            msg.push(
                report.link_no_target.map((data) => {
                    return lang.getWith(lang.i.graph_report['link_no_target'].item_message, [data.targetId, data.fileName]);
                }).join('\n')
            );
        }

        if (report.quotes_without_reference) {
            msg.push(
                lang.getFor(lang.i.graph_report['quotes_without_reference'].head_message)
            );

            msg.push(
                report.quotes_without_reference.map((data) => {
                    return lang.getWith(lang.i.graph_report['quotes_without_reference'].item_message, [data.quoteId, data.fileName]);
                }).join('\n')
            );
        }

        return msg.join('\n\n');
    }

    /**
     * Set params and lauch all the process on files from 'files_origin' dir
     * @param {array} params - Options from Graph.validParams to change the Cosmocope content
     * @param {object} opts - Options from Config
     */

    constructor (params = [], opts = undefined) {

        this.config = new Config(opts);

        this.errors = [];

        this.params = new Set(
            params.filter(parm => Graph.validParams.includes(parm))
        );

        /**
         * Store all report data (objects) into arrays
         * Call by this.reportToSentences() to turn report object to report strings
         * @type object
         */

        this.report = {
            /** @exemple push object { fileName: '', invalidMeta: '' } */
            ignored_files: [],
            /** @exemple push object { fileName: '', type: '' } */
            type_record_change: [],
            /** @exemple push object { fileName: '', type: '' } */
            type_link_change: [],
            /** @exemple push object { fileName: '', targetId: '' } */
            link_invalid: [],
            /** @exemple push object { fileName: '', targetId: '' } */
            link_no_target: [],
            /** @exemple push object { fileName: '', quoteId: '' } */
            quotes_without_reference: [],
            duplicates: []
        };

        /**
         * Contains all processed files and their content, data, stats
         * @type array
         */

        this.files;

        if (this.params.has('sample')) {
            this.config.opts = Config.getSampleConfig();
        }
        if (this.params.has('empty')) {
            this.config.opts.files_origin = undefined;
        }

        this.files = this.getFilesPaths();
        this.files = this.files.map(this.serializeFiles, this);

        if (this.params.has('fake')) {
            let { files, config } = require('../utils/fake');
            this.config.opts = config;
            this.files = files;
        }

        this.files = this.files.filter(this.verifFile, this);

        /**
         * Contains an object for each file from this.files with its id & file name
         * @type array
         */

        this.filesIdnName = this.files.map((file) => {
            return { id: file.metas.id, name: file.name };
        });

        if (this.thereAreDuplicates()) {
            this.errors.push('Some record ids are duplicated. The graph is broke.'); }

        delete this.filesIdnName;

        this.files = this.files.map(this.scanLinksnContexts, this);

        this.validTypes = {
            records: Object.keys(this.config.opts.record_types),
            links: Object.keys(this.config.opts.link_types)
        }

        /**
         * Ids from all files
         * @type array
         */

        this.filesId = this.files.map(file => file.metas.id);

        this.files = this.files.map(this.checkRecordType, this);
        this.files = this.files.map(this.checkLinkTargetnSource, this);

        delete this.validTypes;

        /**
         * Links from all files
         * @type array
         */

        this.filesLinks = this.files.map(file => file.links).flat();

        this.files = this.files.map(this.findBacklinks, this);

        if (this.config.opts.focus_max > 0) {
            this.files = this.files.map(this.evalConnectionLevels, this); }

        if (this.params.has('citeproc') === true && this.config.canCiteproc() === true) {
            this.library = {};

            let libraryFileContent = fs.readFileSync(this.config.opts['bibliography'], 'utf-8');
            libraryFileContent = JSON.parse(libraryFileContent);

            for (const item of libraryFileContent) {
                this.library[item.id] = item; }

            this.citeproc = this.getCSL();

            this.files = this.files.map(this.catchQuoteKeys, this);
            this.files = this.files.map(this.convertQuoteKeys, this);
            this.files = this.files.map(this.getBibliography, this);
        }

        this.data = { // serialize for D3
            nodes: this.getNodes(),
            links: this.getLinks()
        }
    }

    /**
     * Catch all files from the 'files_origin' config path
     * Ignore file without '.md' extension
     * @returns {array} - empty if 'files_origin' is not set or
     * contains the files name
     * @example [ 'file1.md', 'file2.md' ]
     */

    getFilesPaths () {
        if (!this.config.opts.files_origin) { return []; }

        const files = glob.sync('**/*.md', {
            cwd: this.config.opts.files_origin
        }).map(file => path.join(this.config.opts.files_origin, file))

        return files;
    }

    /**
     * Read the files content
     * Separate files metas (from YAML front matter) and content
     * Get some information on file as file name, last edit date…
     * @param {array} fileName - from this.getFilesPaths()
     * @returns {array} - Array of files objets
     */

    serializeFiles(filePath) {
        const file = {};

        file.filePath = filePath;
        file.name = path.basename(filePath);
        file.lastEditDate = fs.statSync(file.filePath).mtime;
        
        file.contain = fs.readFileSync(file.filePath, 'utf8');
        file.metas = ymlFM.loadFront(file.contain);
        file.content = file.metas.__content
        delete file.metas.__content;
        delete file.contain;

        file.metas.tags = file.metas['tags'] || file.metas['keywords'] || [];

        if (typeof file.metas.tags === 'string') {
            file.metas.tags = [];
        }

        return file;
    }

    /**
     * For each file, verif if the required metas are set
     * Store a report message and ignore file if not
     * @param {array} file - from this.serializeFiles()
     * @returns {object} - Array of files objets
     */

    verifFile (file) {
        if (!file.metas.id || isNaN(file.metas.id) === true) {
            this.report.ignored_files.push({ fileName: file.name, invalidMeta: 'id' });
            return false;
        }

        if (!file.metas.title) {
            this.report.ignored_files.push({ fileName: file.name, invalidMeta: 'title' });
            return false;
        }

        return true;
    }

    /**
     * For each file from this.files, check if its id is not used
     * by another file.
     * If an id is used by several files, the Cosmoscope can not be generated
     * A report is stored
     * @returns {boolean} - True id if an id is used by several files
     */

    thereAreDuplicates () {
        let duplicatedFilesNameById = [];

        for (let i = 0; i < this.filesIdnName.length; i++) {
            const fileIdnTitle = this.filesIdnName[i];

            if (Object.keys(duplicatedFilesNameById).includes(String(fileIdnTitle.id))) {
                // if the id had already duplicates identifed
                continue;
            }

            const duplicates = this.filesIdnName.filter(file => file.id === fileIdnTitle.id);

            if (duplicates.length === 1 && duplicates[0].name === fileIdnTitle.name) {
                // if the only element found is in fact the verification element
                continue;
            }

            // store the id of the duplicated files, associated with their name
            // ex : 20201012091721: { file1.md, file2.md }
            duplicatedFilesNameById[fileIdnTitle.id] = duplicates.map(duplic => duplic.name);
        }

        if (Object.keys(duplicatedFilesNameById).length === 0) {
            return false; // if there is no other file with this id
        }

        for (const eltId in duplicatedFilesNameById) {
            const filesWithSameId = duplicatedFilesNameById[eltId];
            this.report.duplicates.push({ id: eltId, files: filesWithSameId })
        }

        return true;
    }

    /**
     * For each file, get paragraphs and their links from file content
     * Paragraphs become the context of their links
     * @param {array} file - from this.serializeFiles()
     * @returns {object} - Array of files objets
     */

    scanLinksnContexts (file) {
        file.contexts = [];
        file.links = [];

        const paraphs = file.content.match(/[^\r\n]+((\r|\n|\r\n)[^\r\n]+)*/g);

        if (paraphs === null) { return file; }

        for (const paraph of paraphs) {
            let links = paraph.match(/(?<=\[\[\s*).*?(?=\s*\]\])/gs);

            if (links === null) { continue; }

            links = deleteDupicates(links)
                .map(link => Graph.normalizeLinks(link).target.id);

            file.contexts.push({
                paraph: paraph,
                ids: links
            });
        }

        file.links = file.content.match(/(?<=\[\[\s*).*?(?=\s*\]\])/gs);

        if (file.links === null) {
            file.links = [];
            return file;
        }

        file.links = deleteDupicates(file.links)
            .map(Graph.normalizeLinks);
        
        return file;
    }

    /**
     * For each file, verif if the type is set form the config
     * If not, change the file type to 'undefined' & store a report
     * @param {array} file - from this.serializeFiles()
     * @returns {object} - Array of files objets
     */

    checkRecordType (file) {
        if (this.validTypes.records.includes(file.metas.type) === false) {
            this.report.type_record_change.push({ fileName: file.name, type: file.metas.type });

            file.metas.type = 'undefined';

            return file;
        }

        return file;
    }

    /**
     * For each link of each file,
     * - verif if it is a numbers string
     * If not, ignore the link & store a report
     * - verif if the type is set form the config
     * If not, change the link type to 'undefined' & store a report
     * - affect its context (paragraphe) and metas about source and target
     * @param {array} file - from this.scanLinksnContexts()
     * @returns {object} - Array of files objets
     */

    checkLinkTargetnSource (file) {
        file.links = file.links.filter((link) => {
            if (isNaN(Number(link.target.id)) === true) {
                this.report.link_invalid.push({ targetId: link.target.id, fileName: file.name })
                return false;
            }

            if (this.filesId.includes(link.target.id) === false) {
                this.report.link_no_target.push({ targetId: link.target.id, fileName: file.name })
                return false;
            }

            return true;
        });

        file.links = file.links.map((link) => {
            if (this.validTypes.links.includes(link.type) === false) {
                this.report.type_link_change.push({ fileName:file.name, type: link.type });

                link.type = 'undefined';
            }

            link.context = file.contexts
                .find(context => context.ids.includes(link.target.id))?.paraph || null;

            link.source = {
                id: file.metas.id,
                title: file.metas.title,
                type: file.metas.type
            };

            link.target = {
                id: link.target.id,
                title: this.files.find(file => file.metas.id == link.target.id).metas.title,
                type: this.files.find(file => file.metas.id == link.target.id).metas.type
            };

            return link;
        });

        return file;
    }

    /**
     * For each link of each file,
     * get backlinks, the links from the files targeting this file
     * @param {array} file - from this.checkLinkTargetnSource()
     * @returns {object} - Array of files objets
     */

    findBacklinks (file) {
        file.backlinks = this.filesLinks
            .filter(link => link.target.id === file.metas.id);

        return file;
    }

    /**
     * For each file, get the connection levels
     * The first connection level contains all nodes that are directly linked to the file
     * as link or backlink
     * The second connection level contains all nodes that are connected to the first one
     * and so forth
     * @param {array} file - from this.findBacklinks()
     * @returns {object} - Array of files objets
     */

    evalConnectionLevels (file) {
        file.focusLevels = [];

        const nodeId = file.metas.id
            , maxLevel = this.config.opts.focus_max;

        let index = [] // store all levels
            , idsList = []; // contains all handled node ids

        index.push([nodeId]); // add the node as "zero" level

        for (let i = 0 ; i < maxLevel ; i++) {

            let level = []; // store nodes id of the level

            for (const target of index[index.length - 1]) {
                // searching connections for each nodes from the last indexed level
                let result = getConnectedIds.apply(this, [target]);

                if (result === false) {
                    // if the connected node have not connections, analyse the next one
                    continue;
                }

                // ignore ids already registered into another level to avoid infinity loop
                result = result.filter(target => idsList.includes(target) === false);

                level = level.concat(result);
            }

            if (level.length === 0) {
                // Stop the analysis : the current level contain any connection. It is not stored.
                break;
            }

            // ignore duplicated ids
            level = deleteDupicates(level);

            index.push(level);
            idsList = index.flat();
        }

        file.focusLevels = index.slice(1); // ignore level "zero"

        /**
         * Get the id of the connected nodes
         * @param {number} nodeId
         * @returns {array} - Ids of the connected nodes (by link or backlink)
         */

        function getConnectedIds(nodeId) {
            let sources = this.files
                .find(file => file.metas.id === nodeId).links
                .map(link => link.target.id);

            let targets = this.files
                .find(file => file.metas.id === nodeId).backlinks
                .map(backlink => backlink.source.id);

            targets = targets.concat(sources);

            if (targets.length === 0) {
                return false; }

            return targets;
        }

        return file;
    }

    /**
     * Get the 'stroke' and 'color' for a link from the config
     * Assign default value in case of unknown values
     * @param {string} linkType - Name of a type from 'link_types' object (from config file)
     * @returns {object}
     * @exemple For 'documentation' returns { shape: { stroke: 'dash', dashInterval: '4, 5' }, color: 'black' }
     */

    getLinkStyle (linkType) {
        const linkTypeConfig = this.config.opts.link_types[linkType];
        let stroke, color;

        if (linkTypeConfig) {
            stroke = linkTypeConfig.stroke;
            color = linkTypeConfig.color;
        } else {
            stroke = 'simple';
            color = null;
        }

        switch (stroke) {
            case 'simple':
                return { shape: { stroke: stroke, dashInterval: null }, color: color };
                
            case 'double':
                return { shape: { stroke: stroke, dashInterval: null }, color: color };
    
            case 'dash':
                return { shape: { stroke: stroke, dashInterval: '4, 5' }, color: color };
    
            case 'dotted':
                return { shape: { stroke: stroke, dashInterval: '1, 3' }, color: color };
        }
    
        // default return
        return { shape: { stroke: 'simple', dashInterval: null }, color: color };
    }

    /**
     * Get all files as nodes, with metas for D3 vizualisation
     * @returns {array} - Array of node objects
     */

    getNodes () {
        return this.files.map((file) => {
            return {
                id: file.metas.id,
                label: file.metas.title,
                type: file.metas.type,
                size: Graph.getNodeRank(file.links.length, file.backlinks.length),
                focus: file.focusLevels
            }
        })
    }

    /**
     * Get all files links as graph links, with metas for D3 vizualisation
     * @returns {array} - Array of node objects
     */

    getLinks () {
        return this.filesLinks.map((link, id) => {
            const style = this.getLinkStyle(link.type);

            return {
                id: id,
                type: link.type,
                shape: style.shape,
                color: style.color,
                source: link.source.id,
                target: link.target.id
            }
        });
    }

    /**
     * Get 'citeproc' engine, from library (JSON CSL) and config files (XML, CSL)
     * @returns {CSL} - Engine for quote process
     */

    getCSL () {
        const xmlLocal = fs.readFileSync(this.config.opts['csl_locale'], 'utf-8')
            , cslStyle = fs.readFileSync(this.config.opts['csl'], 'utf-8');

        return new CSL.Engine({
            retrieveLocale: () => {
                return xmlLocal;
            },
            retrieveItem: (id) => {
                // find the quote item : CSL-JSON object
                return this.library[id];
            }
        }, cslStyle);
    }

    /**
     * For each file, get all quoting keys from its content
     * @param {array} file - from this.serializeFiles()
     * @return {array} - Array of files objets
     */

    catchQuoteKeys (file) {
        file.quotes = {};

        let extractions = Citr.util.extractCitations(file.content);

        quoteExtraction:
        for (let i = 0; i < extractions.length; i++) {
            const extraction = extractions[i];

            let quotes;

            try {
                quotes = Citr.parseSingle(extraction);
            } catch (error) {
                quotes = [];
            }

            // there could be several quotes from one key
            for (const q of quotes) {

                if (!this.library[q.id]) {
                    // if the quote id is not defined from library
                    this.report.quotes_without_reference.push({ fileName: file.name, quoteId: q.id })
                    continue quoteExtraction;
                }

                this.library[q.id].used = true;
            }

            file.quotes[extraction] = quotes;
        }

        return file;
    }

    /**
     * For each file, replace each quoting key (contains into the library) from the file content by a short quote from library
     * @param {array} file - from this.catchQuoteKeys()
     * @return {array} - Array of files objets
     */

    convertQuoteKeys (file) {
        this.citeproc.updateItems(Graph.getQuoteKeysFromQuoteObject(file.quotes));
    
        const citations = Object.values(file.quotes).map(function(key, i) {
            return [{
                citationItems: key,
                properties: { noteIndex: i + 1 }
            }];
        });
    
        for (let i = 0; i < citations.length; i++) {
            const cit = citations[i];
            const key = Object.keys(file.quotes)[i]
    
            const citMark = this.citeproc.processCitationCluster(cit[0], [], [])[1][0][1];
    
            file.content = file.content.replaceAll(key, citMark);
        }
    
        return file;
    }

    /**
     * For each file, get the bibliography (from the library) for each contained quote
     * @param {array} file - from this.catchQuoteKeys()
     * @return {array} - Array of files objets
     */

    getBibliography (file) {
        this.citeproc.updateItems(Graph.getQuoteKeysFromQuoteObject(file.quotes));

        file.bibliography = this.citeproc.makeBibliography()[1].join('\n');

        return file;
    }

    /**
     * Get all metas for each quoted reference from all files
     * @return {array} - Array of objects (references)
     */

    getUsedCitationReferences () {
        if (this.params.has('citeproc') === false || this.config.canCiteproc() === false) { return null; }

        const refs = Object.values(this.library).filter(item => item.used === true);

        if (refs.length === 0) { return null; }

        return refs;
    }

}

/**
 * Delete duplicated elements from an array
 * @param {array} array - Array with duplicated elements
 * @return {array} - Array without duplicated elements
 */

function deleteDupicates (array) {
    if (array.length < 2) { return array; }

    return array.filter((item, index) => {
        return array.indexOf(item) === index
    });
}
/**
 * @file Generate records
 * @author Guillaume Brioudes
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

/**
 * @typedef Direction
 * @type {object}
 * @property {number} id
 * @property {string} title
 * @property {string} type
 */

/**
 * @typedef Reference
 * @type {object}
 * @property {string} context
 * @property {string} type
 * @property {Direction} source
 * @property {Direction} target
 */

const path = require('path')
    , fs = require('fs')
    , yml = require('js-yaml')
    , moment = require('moment')
    , slugify = require('slugify');

const Config = require('./config')
    , Graph = require('./graph')
    , Cosmoscope = require('./cosmoscope')
    , Node = require('./node')
    , Link = require('./link')
    , lang = require('./lang');

module.exports = class Record {

    /**
     * Save several records from a JSON object
     * @param {object} data - Array of objects
     * @return {mixed} - Invalid items key or true
     * @example
     * Record.massSave([
     *  { title: 'Idea 1', type: 'ideas', tags: 'tag 1,tag 2' ... }
     *  { title: 'Concept 1', type: 'concept' ... }
     * ])
     */

    static massSave (data) {
        
        let i = Record.getIndexToMassSave();

        let report = [];

        for (const item of data) {
            const record = new Record(
                item.title,
                item.type,
                item.tags,
                item.content,
                item.filename,
                Record.generateOutDailyId() + i
            );

            const result = record.saveAsFile(true);

            if (result === false) {
                report.push(i);
                continue;
            }

            i++;
        }

        if (report.length !== 0) {
            return report }

        return true;
    }

    /**
     * Get a number (14 caracters) from the time stats :
     * year + month + day + hour + minute + second
     * @return {number} - unique 14 caracters number from the second
     */

    static generateId () {
        return Number(moment().format('YYYYMMDDHHmmss'));
    }

    /**
     * Get an id, as Record.generateId(), but out of the daily hour, minute, second
     * The hour, minute, second are out of the daily common time, as 25 hours, 84 minutes and 61 secondes
     * @return {number} - unique 14 caracters number as 20220115246165
     */

    static generateOutDailyId () {
        const maxHour = 24, maxMinute = 60, maxSecond = 60;
        return Number(moment().format('YYYYMMDD') + maxHour + maxMinute + maxSecond);
    }

    /**
     * Test if an id is out of today common time
     * @return {boolean}
     */

    static isTodayOutDailyId (idTest) {
        let todayOutDailyId = Record.generateOutDailyId();
        // An id from common time or from another day will be negative
        if (idTest - todayOutDailyId >= 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Get the index from which to create new records in the mass
     * The index depends on the identifier of the last record created in the mass
     * The index is obtained via the Graph analysis
     * @return {number}
     */

    static getIndexToMassSave () {
        const { files_origin: filesPath } = Config.get();
        const todayMassSavedRecordIds = Cosmoscope.getFromPathFiles(filesPath) // get graph analyse
            .map(file => file.metas.id)
            .filter(Record.isTodayOutDailyId) // ignore not today mass saved records id
            .sort();

        // 'todayMassSavedRecordIds' can be empty
        let lastId = todayMassSavedRecordIds[todayMassSavedRecordIds.length - 1] || undefined;
        // 20220115246695 - 20220115246060 = 635, the index for the next record is 635 + 1
        return lastId - Record.generateOutDailyId() + 1 || 1;
    }

    /**
     * @param {Reference[]} referenceArray
     * @returns {boolean}
     */

    static verifReferenceArray(referenceArray) {
        if (Array.isArray(referenceArray) === false) {
            return false;
        }
        for (const reference of referenceArray) {
            if (typeof reference !== 'object') {
                return false;
            }
            if (
                typeof reference['context'] !== 'string' ||
                typeof reference['source'] !== 'object' ||
                typeof reference['target'] !== 'object'
            ) {
                return false;
            }
            if (
                Record.verifDirectionArray(reference['source']) === false ||
                Record.verifDirectionArray(reference['target']) === false
            ) {
                return false; 
            }
        }
        return true;
    }

    /**
     * @param {Direction} direction
     * @returns {boolean}
     */

    static verifDirectionArray(direction) {
        if (!direction['id'] || !direction['title'] || !direction['type']) {
            return false;
        }
        if (isNaN(direction['id'])) {
            return false;
        }
        return true;
    }

    /**
     * Generate a record,
     * a named dataset, with references to others, validated from a configuration
     * @param {string} id - Unique identifier of the record.
     * @param {string} title - Title of the record.
     * @param {string | string[]} [type='undefined'] - Type of the record, registred into the config.
     * @param {string | string[]} tags - List of tags of the record.
     * @param {object} metas - Metas to add to Front Matter.
     * @param {string} content - Text content if the record.
     * @param {Reference[]} links - Link, to others records.
     * @param {Reference[]} backlinks - Backlinks, from others records.
     * @param {number} begin - Timestamp.
     * @param {number} end - Timestamp.
     * @param {string} image - Image path
     * @param {object} opts
     */

    constructor (
        id = Record.generateId(),
        title,
        type = 'undefined',
        tags,
        metas,
        content = '',
        links = [],
        backlinks = [],
        begin,
        end,
        image,
        opts
    ) {
        this.id = Number(id);
        this.title = title;
        this.type = type;
        this.tags = [];
        this.metas = metas;

        if (tags) {
            if (Array.isArray(tags)) {
                this.tags = tags.length === 0 ? [] : tags;
            } else {
                this.tags = tags.split(',').filter((str) => str !== '');
                this.tags = this.tags.length === 0 ? [] : this.tags;
            }
        }

        this.ymlFrontMatter = this.getYamlFrontMatter();
        this.ymlFrontMatter = '---\n' + this.ymlFrontMatter + '---\n\n';

        const config = new Config(opts);
        const typesRecords = config.getTypesRecords();
        const typesLinks = config.getTypesLinks();

        if (typeof this.type === 'string') {
            /** @type {string[]} */
            this.type = [this.type]
        }
        this.type = this.type.map(type => {
            if (typesRecords.has(type)) { return type; }
            return 'undefined';
        });

        this.content = content;
        this.links = links;
        this.backlinks = backlinks;
        this.begin;
        if (begin && moment(begin).isValid() === true) {
            this.begin = moment(begin).unix();
        }
        this.end;
        if (end && moment(end).isValid() === true) {
            this.end = moment(end).unix();
        }
        this.image;
        if (image && config.isValid() && config.opts['images_origin']) {
            this.image = path.join(config.opts['images_origin'], image);
        }

        this.links = this.links.map((link) => {
            if (typesLinks.has(link.type)) {
                return link;
            }
            link.type = 'undefined';
            return link;
        });

        this.config = config.opts;
        /**
         * Invalid fields
         * @type array
         */
        this.report = [];

        this.verif();
    }

    getYamlFrontMatter() {
        return yml.dump({
            title: this.title,
            id: this.id,
            type: this.type,
            tags: this.tags.length === 0 ? undefined : this.tags,
            ...this.metas
        });
    }

    /**
     * Save the record to the config 'files_origin' path option
     * @param {boolean} force - If can overwrite
     * @param {string} fileName
     * @return {boolean} - True if the record is saved, false if fatal error
     * or the errors array
     */

    saveAsFile (force = false, fileName = this.title) {
        this.content = this.ymlFrontMatter + this.content;

        /** @exemple 'my-idea.md' */
        this.fileName = slugify(fileName, {
            replacement: ' ',
            remove: /[&*+~.'"!:@]/g,
        });
        this.fileName = `${this.fileName}.md`;
        this.path = path.join(this.config.files_origin, this.fileName);

        if (this.isValid() === false) {
            return false;
        }

        if (this.willOverwrite() === true && force === false) {
            return 'overwriting';
        }

        try {
            fs.writeFileSync(this.path, this.content);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * Store invalid fields into this.report
     */

    verif () {
        if (this.title === '') {
            this.report.push('title'); }

        if (isNaN(this.id)) {
            this.report.push('id'); }

        if (this.links !== undefined && Record.verifReferenceArray(this.links) === false) {
            this.report.push('links'); }

        if (this.backlinks !== undefined && Record.verifReferenceArray(this.backlinks) === false) {
            this.report.push('backlinks'); }
    }

    /**
     * Check 'this.report' array.
     * If it is empty : TRUE
     * @returns {boolean}
     */

    isValid () {
        if (this.report.length === 0) {
            return true; }

        return false;
    }

    /**
     * Tranform 'this.report' array (contains error list) to a string
     * @returns {string}
     */

    writeReport () {
        return this.report
            .map((invalidField) => {
                return lang.getFor(lang.i.record.errors[invalidField]);
            })
            .join(', ');
    }

    /**
     * Verif if a file already exist with this name
     * @return {boolean}
     */

    willOverwrite () {
        if (fs.existsSync(this.path)) {
            return true;
        }

        return false;
    }

};
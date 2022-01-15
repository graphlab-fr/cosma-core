/**
 * @file Generate records
 * @author Guillaume Brioudes
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

const path = require('path')
    , fs = require('fs')
    , yml = require('js-yaml')
    , moment = require('moment')
    , slugify = require('slugify');

const Config = require('./config')
    , Graph = require('./graph')
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

            const result = record.save(true);

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
        const todayMassSavedRecordIds = new Graph().files // get graph analyse
            .map(file => file.metas.id)
            .filter(Record.isTodayOutDailyId) // ignore not today mass saved records id
            .sort();

        // 'todayMassSavedRecordIds' can be empty
        let lastId = todayMassSavedRecordIds[todayMassSavedRecordIds.length - 1] || undefined;
        // 20220115246695 - 20220115246060 = 635, the index for the next record is 635 + 1
        return lastId - Record.generateOutDailyId() + 1 || 1;
    }

    /**
     * Generate a record.
     * @param {string} title - Title of the record.
     * @param {string} type - Type of the record, registred into the config.
     * @param {string} tags - List of tags of the record.
     * @param {string} content - Text content if the record.
     * @param {string} fileName - Text content (Markdown) if the record.
     * @param {string} id - Unique identifier of the record.
     * @example new Record('My record', 'concept', 'tag 1,tag 2', 'Lorem *ipsum*', 'my-record', 20210704100343);
     */

    constructor (title, type = 'undefined', tags = '', content = '', fileName = title, id = Record.generateId()) {
        /**
         * @type string
         */
        this.title = title;
        /**
         * @type number
         * @example 20210704100343
         */
        this.id = id;
        /**
         * @type string
         * @default 'undefined'
         * @example 20210704100343
         */
        this.type = type;
        /**
         * @type array
         */
        this.tags

        if (tags !== '') { this.tags = tags.split(','); }

        /**
         * @type string
         */
        this.ymlFrontMatter = yml.dump(this);
        this.ymlFrontMatter = '---\n' + this.ymlFrontMatter + '---\n\n';
        /**
         * @type string
         */
        this.content = this.ymlFrontMatter + content;
        /**
         * from Config().opts
         * @type object
         */
        this.config = new Config().opts;
        /**
         * Markdown file name, with its extension
         * @type string
         * @exemple 'my idea.md'
         */
        this.fileName = slugify(fileName, {
            replacement: ' ',
            remove: /[&*+~.'"!:@]/g,
        });
        this.fileName = `${this.fileName}.md`;
        /**
         * Path to Markdown file destination
         * @type string
         */
        this.path = path.join(this.config.files_origin, this.fileName);
        /**
         * Invalid fields
         * @type array
         */
        this.report = [];

        this.verif();
    }

    /**
     * Save the record to the config 'files_origin' path option
     * @param {boolean} force - If can overwrite
     * @return {mixed} - True if the record is saved, false if fatal error
     * or the errors array
     */

    save (force = false) {
        try {
            if (this.isValid() === false) {
                return false;
            }

            if (this.willOverwrite() === true && force === false) {
                return 'overwriting';
            }

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

        if (new RegExp(/^[0-9]{14}$/gs).test(this.id) === false) {
            this.report.push('id'); }

        if (this.config.record_types[this.type] === undefined) {
            this.report.push('type'); }
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
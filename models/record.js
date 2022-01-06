/**
 * @file Generate records
 * @author Guillaume Brioudes
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

const path = require('path')
    , fs = require('fs')
    , yml = require('js-yaml')
    , moment = require('moment');

const Config = require('./config')
    , lang = require('./lang');

module.exports = class Record {

    /**
     * Get a number (14 caracters) from the time stats :
     * year + month + day + hour + minute + second
     * @return {number} - unique 14 caracters number from the second
     */

    static generateId () {
        return Number(moment().format('YYYYMMDDHHmmss'));
    }

    /**
     * Generate a record.
     * @param {string} title - Title of the record.
     * @param {string} type - Type of the record, registred into the config.
     * @param {string} tags - List of tags of the record.
     * @param {string} content - Text content if the record.
     * @param {string} fileName - Text content (Markdown) if the record.
     * @example new Record('My record', 'concept', 'tag 1,tag 2', 'Lorem *ipsum*', 'my-record');
     */

    constructor (title, type = 'undefined', tags = '', content = '', fileName = title) {
        /**
         * @type string
         */
        this.title = title;
        /**
         * @type number
         * @example 20210704100343
         */
        this.id = Record.generateId();
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
        this.fileName = `${fileName}.md`
        /**
         * Path to Markdown file destination
         * @type string
         */
        this.path = path.join(this.config.files_origin, `${fileName}.md`);
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
                return;
            }

            if (this.willOverwrite() === true && force === false) {
                return 'overwriting';
            }

            fs.writeFileSync(this.path, this.content);

            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Store invalid fields into this.report
     */

    verif () {
        if (this.title === '') {
            this.report.push('title'); }

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
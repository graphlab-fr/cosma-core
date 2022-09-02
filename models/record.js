/**
 * @file Format data for records, verif and save as file
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

/**
 * @typedef DeepFormatedRecordData
 * @type {object}
 * @property {string|undefined} id
 * @property {string} title
 * @property {object} content
 * @property {object} type
 * @property {object} metas
 * @property {object} tags
 * @property {object} time
 * @property {string[]} references
 * @property {string} thumbnail
 */

/**
 * @typedef FormatedRecordData
 * @type {object}
 * @property {string|undefined} id
 * @property {string} title
 * @property {string} content
 * @property {string[]} type
 * @property {object} metas
 * @property {string[]} tags
 * @property {string[]} references
 * @property {string} begin
 * @property {string} end
 * @property {string} thumbnail
 */

const path = require('path')
    , fs = require('fs')
    , yml = require('js-yaml')
    , moment = require('moment')
    , slugify = require('slugify');

const Config = require('./config')
    , Bibliography = require('./bibliography')
    , lang = require('./lang');

module.exports = class Record {
    /**
     * Get data from a fromated CSV line
     * @param {object} line
     * @return {DeepFormatedRecordData}
     * ```
     * Record.getFormatedDataFromCsvLine({
     *    'title': 'Paul Otlet',
     *    'type:étude': 'documentation',
     *    'type:relation': 'ami',
     *    'tag:genre': 'homme',
     *    'content:biography': 'Lorem ipsum...',
     *    'content:notes': 'Lorem ipsum...',
     *    'meta:prenom': 'Paul',
     *    'meta:nom': 'Otlet',
     *    'time:begin': '1868',
     *    'time:end': '1944',
     *    'thumbnail': 'photo.jpg',
     *    'references': 'otlet1934'
     *})
     * ```
     */

    static getDeepFormatedDataFromCsvLine({ title, id, thumbnail, references = [], ...rest }) {
        let content = {}, type = {}, metas = {}, tags = {};
        for (const [key, value] of Object.entries(rest)) {
            const [field, label] = key.split(':', 2);
            if (field === 'time') { continue; }
            switch (field) {
                case 'content':
                    content[label] = value;
                    break;
                case 'type':
                    type[label] = value;
                    break;
                case 'tag':
                    tags[label] = value;
                    break;
                case 'meta':
                default:
                    metas[label] = value;
                    break;
            }
        }

        if (typeof references === 'string') {
            references = references.split(',');
        }

        return {
            id,
            title,
            content,
            type,
            metas,
            tags,
            references,
            time: {
                begin: rest['time:begin'],
                end: rest['time:end'],
            },
            thumbnail: thumbnail
        };
    }

    /**
     * Get data from a fromated CSV line
     * @param {object} line
     * @return {FormatedRecordData}
     * ```
     * Record.getFormatedDataFromCsvLine({
     *    'title': 'Paul Otlet',
     *    'type:étude': 'documentation',
     *    'type:relation': 'ami',
     *    'tag:genre': 'homme',
     *    'content:biography': 'Lorem ipsum...',
     *    'content:notes': 'Lorem ipsum...',
     *    'meta:prenom': 'Paul',
     *    'meta:nom': 'Otlet',
     *    'time:begin': '1868',
     *    'time:end': '1944',
     *    'thumbnail': 'photo.jpg',
     *    'references': 'otlet1934'
     *})
     * ```
     */

    static getFormatedDataFromCsvLine({ title, id, thumbnail, references = [], ...rest }) {
        if (!title) { throw "'title' is a required meta for a record"; }

        let contents = [], type = [], metas = {}, tags = [];
        for (const [key, value] of Object.entries(rest)) {
            const [field, label] = key.split(':', 2);
            if (field === 'time') { continue; }
            switch (field) {
                case 'content':
                    if (label) {
                        contents.push([`<h3>${label}</h3>`, value]);
                    } else {
                        contents.push(value);
                    }
                    break;
                case 'type':
                    type.push(value);
                    break;
                case 'tag':
                    tags.push(value);
                    break;
                case 'reference':
                    references = value.split(',');
                    break;
                case 'meta':
                default:
                    metas[label] = value;
                    break;
            }
        }

        if (typeof references === 'string') {
            references = references.split(',');
        }
        const content = contents
            .map((content) => {
                if (Array.isArray(content)) {
                    return content.join('\n\n')
                }
                return content;
            })
            .join('\n\n');

        return {
            id,
            title,
            content,
            type,
            metas,
            tags,
            references,
            begin: rest['time:begin'],
            end: rest['time:end'],
            thumbnail: thumbnail
        };
    }

    /**
     * Force save as file several records
     * @param {FormatedRecordData[]} data
     * @param {number} index
     * @param {Config.opts} configOpts
     * @return {number[]|true} Invalid items key or true
     * @example
     * Record.massSave([
     *  { title: 'Idea 1', type: 'ideas', tags: 'tag 1,tag 2' ... }
     *  { title: 'Concept 1', type: 'concept' ... }
     * ])
     */

    static massSave(data, index, configOpts) {
        if (!index || typeof index !== 'number') {
            throw 'The index for record mass save is invalid';
        }

        const report = [];
        for (const { title, type, tags, metas, content, begin, end, references = [], thumbnail } of data) {
            const record = new Record(
                Record.generateOutDailyId() + index,
                title,
                type,
                tags,
                metas,
                content,
                undefined,
                undefined,
                begin,
                end,
                Bibliography.getBibliographicRecordsFromList(references),
                thumbnail,
                configOpts
            );

            const result = record.saveAsFile(true);
            if (result === false) {
                console.log(record);
                report.push(index);
                continue;
            }

            index++;
        }

        if (report.length !== 0) { return report }

        return true;
    }

    /**
     * @param {string} fileName 
     * @returns {string}
     * @exemple
     * ```
     * Record.getSlugFileName('My [@récörd?!]') // => 'My record.md'
     * ```
     */

    static getSlugFileName(fileName) {
        const slugName = slugify(fileName, {
            replacement: ' ',
            remove: /[&*+=~'"!?:@#$%^(){}\[\]\\/]/g,
        });
        return slugName + '.md';
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
     * @param {BibliographicRecord[]} bibliographicRecords
     * @param {string} thumbnail - Image path
     * @param {object} opts
     */

    constructor (
        id = Record.generateId(),
        title,
        type = 'undefined',
        tags = [],
        metas = {},
        content = '',
        links = [],
        backlinks = [],
        begin,
        end,
        bibliographicRecords = [],
        thumbnail,
        opts
    ) {
        this.id = Number(id);
        this.title = title;
        this.type = type;
        this.tags = tags;
        this.content = content;
        this.bibliographicRecords = bibliographicRecords;
        this.bibliography = '';
        this.thumbnail = thumbnail;

        if (tags) {
            if (Array.isArray(tags)) {
                tags = tags.filter(tag => !!tag);
                this.tags = tags.length === 0 ? [] : tags;
            } else {
                this.tags = tags.split(',').filter((str) => str !== '');
            }
        }

        const config = new Config(opts);
        const typesRecords = config.getTypesRecords();
        const typesLinks = config.getTypesLinks();

        if (typeof this.type === 'string') {
            /** @type {string[]} */
            this.type = [this.type]
        }
        this.type = this.type.filter(type => !!type);
        this.type = this.type.map(type => {
            if (typesRecords.has(type)) { return type; }
            return 'undefined';
        });
        this.type = Array.from(new Set(this.type));
        metas = Object.entries(metas)
            .filter(([key, value]) => value !== null);
        this.metas = Object.fromEntries(metas);

        this.ymlFrontMatter = this.getYamlFrontMatter();

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

        this.links = this.links.map((link) => {
            if (typesLinks.has(link.type)) {
                return link;
            }
            link.type = 'undefined';
            return link;
        });

        this.config = config;
        /**
         * Invalid fields
         * @type array
         */
        this.report = [];

        this.verif();
    }

    getYamlFrontMatter() {
        const bibliographicIds = this.bibliographicRecords.map(({ ids }) => Array.from(ids)).flat()
        const ymlContent = yml.dump({
            title: this.title,
            id: this.id,
            type: this.type,
            tags: this.tags.length === 0 ? undefined : this.tags,
            references: bibliographicIds.length === 0 ? undefined : bibliographicIds,
            thumbnail: this.thumbnail,
            ...this.metas
        });
        const frontMatterPlainText = ['---\n', ymlContent, '---\n\n'].join('');
        return frontMatterPlainText;
    }

    /**
     * The keys like '[@Goody_1979, 12]' are remplace, as (Goody 1979 p. 12)
     * and assign this.bibliography with HTML
     * @param {Bibliography} bibliography
     */

    replaceBibliographicText(bibliography) {
        const bibliographyHtml = new Set();
        for (const bibliographicRecord of this.bibliographicRecords) {
            const { record, cluster } = bibliography.get(bibliographicRecord);
            bibliographyHtml.add(record);
            const { text } = bibliographicRecord;
            if (!text) { continue; }
            let regex = '\\[' + text.substring(1, text.length - 1) + '\\]';
            regex = new RegExp(regex, 'g');
            this.content = this.content.replace(regex, cluster);
        }
        this.bibliography = Array.from(bibliographyHtml).join('\n');
    }

    /**
     * Save the record to the config 'files_origin' path option
     * @param {boolean} force - If can overwrite
     * @param {string} fileName
     * @return {boolean} - True if the record is saved, false if fatal error
     * or the errors array
     */

    saveAsFile (force = false, fileName = this.title) {
        if (this.isValid() === false) {
            return false;
        }

        this.fileName = Record.getSlugFileName(fileName);
        this.path = path.join(this.config.opts.files_origin, this.fileName);

        if (this.willOverwrite() === true && force === false) {
            return 'overwriting';
        }

        this.content = this.ymlFrontMatter + this.content;

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
        if (!this.title) {
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
/**
 * @file Register error in recoding processs
 * @author Guillaume Brioudes
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

const path = require('path')
    , nunjucks = require('nunjucks');

module.exports = class Report {
    static listWarnings = new Map();
    static listErrors = new Map();

    /**
     * @param {Config} config 
     * @returns {string} HTML
     */

    static getAsHtmlFile() {
        const lang = require('./lang');
        const templateEngine = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path.join(__dirname, '../'))
        );
        templateEngine.addFilter('translate', (input, args) => {
            return lang.getWith(lang.i['report'][input], Object.values(args));
        });
        return templateEngine.render('report.njk', {
            lang: lang.flag,
            listWarnings: Object.fromEntries(Report.listWarnings),
            listErrors: Object.fromEntries(Report.listErrors),
            warningsLength: Report.listWarnings.size,
            errorsLength: Report.listErrors.size
        });
    }

    static getAsMessage() {
        if (Report.listErrors.size === 0 && Report.listWarnings.size === 0) {
            return null;
        }
        let message = ['Report'];
        if (Report.listErrors.size > 0) {
            message.push(`${Report.listErrors.size} \x1b[31merrors\x1b[0m`)
        }
        if (Report.listWarnings.size > 0) {
            message.push('and',`${Report.listWarnings.size} \x1b[33mwarnings\x1b[0m`)
        }
        return message.join(' ');
    }

    /**
     * Generate and register a report
     * @param {Record.id} recordId 
     * @param {Record.title} recordTitle 
     * @param {'warning'|'error'} urgency 
     */

    constructor(recordId, recordTitle, urgency) {
        this.recordId = recordId;
        this.recordTitle = recordTitle;
        this.urgency = urgency;
        this.about;
        this.args = {};

        switch (this.urgency) {
            case 'error':
                if (Report.listErrors.has(this.recordId)) {
                    const r = Report.listErrors.get(this.recordId);
                    r.push(this);
                } else {
                    Report.listErrors.set(this.recordId, [this]);
                }
                break;
            case 'warning':
                if (Report.listWarnings.has(this.recordId)) {
                    const r = Report.listWarnings.get(this.recordId);
                    r.push(this);
                } else {
                    Report.listWarnings.set(this.recordId, [this]);
                }
                break;
        }
    }

    /**
     * Record from a file has no identifier
     * @param {File.name} fileName
     */

    aboutNoId(fileName) {
        this.about = 'no_id';
        this.args = { fileName };
    }

    /**
     * Some record has the same identifier
     * @param {Record.id} recordId
     * @param {Record.title} recordTitle
     * @param {Record.title} recordTitleOfDuplicated
     */

    aboutDuplicatedIds(recordId, recordTitle, recordTitleOfDuplicated) {
        this.about = 'duplicated_ids';
        this.args = { recordId, recordTitle, recordTitleOfDuplicated };
    }

    /**
     * A link has no source or target
     * @param {Record.title} recordTitle
     * @param {Link.contect} linkContext
     */

    aboutBrokenLinks(recordTitle, linkContext) {
        this.about = 'broken_links';
        this.args = { recordTitle, linkContext };
    }

    /**
     * A link has undefined type, replaced by type 'undefined'
     * @param {Record.title} recordTitle
     * @param {string|number} linkTargetId
     * @param {string} unknownType
     */

    aboutLinkTypeChange(recordTitle, linkTargetId, unknownType) {
        this.about = 'link_type_change';
        this.args = { recordTitle, linkTargetId, unknownType };
    }

    /**
     * A record has undefined type, replaced by type 'undefined'
     * @param {Record.title} recordTitle
     * @param {string} unknownType
     */

    aboutRecordTypeChange(recordTitle, unknownType) {
        this.about = 'record_type_change';
        this.args = { recordTitle, unknownType };
    }

    /**
     * A record meta is not allowed from config
     * @param {Record.title} recordTitle
     * @param {string} ignoredMeta
     */

    aboutIgnoredRecordMeta(recordTitle, ignoredMeta) {
        this.about = 'ignored_record_meta';
        this.args = { recordTitle, ignoredMeta };
    }

    /**
     * A record meta is null
     * @param {Record.title} recordTitle
     * @param {string} ignoredMeta
     */

    aboutNullRecordMeta(recordTitle, ignoredMeta) {
        this.about = 'null_record_meta';
        this.args = { recordTitle, ignoredMeta };
    }

    /**
     * A record time is null
     * @param {Record.title} recordTitle
     * @param {string} invalidTime
     */

    aboutInvalidRecordTimeBegin(recordTitle, invalidTime) {
        this.about = 'invalid_record_time_begin';
        this.args = { recordTitle, invalidTime };
    }

    /**
     * A record time is null
     * @param {Record.title} recordTitle
     * @param {string} invalidTime
     */

    aboutInvalidRecordTimeEnd(recordTitle, invalidTime) {
        this.about = 'invalid_record_time_end';
        this.args = { recordTitle, invalidTime };
    }

    /**
     * A record reference is not registred in library
     * @param {Record.title} recordTitle
     * @param {string} bibliographicReference
     */

    aboutUnknownBibliographicReference(recordTitle, bibliographicReference) {
        this.about = 'unknown_bibliographic_reference';
        this.args = { recordTitle, bibliographicReference };
    }
}
/**
 * @file Configuration administration
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

const path = require('path')
    , fs = require('fs')
    , yml = require('js-yaml');

const lang = require('./lang');

/**
 * Class to manage the user config
 */

module.exports = class Config {

    /**
     * Default configuration
     * @static
     */

    static base = {
        files_origin: '',
        export_target: '',
        history: true,
        focus_max: 2,
        record_types: { undefined: '#858585' },
        link_types: { undefined: { stroke: 'simple', color: '#cccccc' } },
        graph_background_color: '#ffffff',
        graph_highlight_color: '#ee2121',
        graph_highlight_on_hover: true,
        graph_text_size: 10,
        graph_arrows: true,
        attraction_force: 200,
        attraction_distance_max: 250,
        attraction_vertical: 0,
        attraction_horizontal: 0,
        views: {},
        title: '',
        author: '',
        description: '',
        keywords: [],
        link_symbol: '',
        csl: '',
        bibliography: '',
        csl_locale: '',
        css_custom: '',
        devtools: false,
        minify: false,
        lang: 'fr'
    };

    /**
     * Get the context of the process
     * @returns {string} - 'electron' or 'other'
     * @static
     */

    static getContext () {
        if (process.versions['electron'] !== undefined) {
            return 'electron';
        }

        return 'other';
    }

    /**
     * Get the config file path
     * @returns {string}
     * @static
     */

    static getFilePath () {
        const context = Config.getContext();

        if (context === 'electron') {
            const { app } = require('electron');
            return path.join(app.getPath('userData'), 'config.json');
        }
        
        return path.join(__dirname, '../../', 'config.yml');
    }

    /**
     * Min value for each number options
     * Apply to config form and to verif values from this class
     * @static
     */

    static minValues = {
        focus_max: 0,
        graph_text_size: 5,
        attraction_force: 50,
        attraction_distance_max: 200,
        attraction_vertical: 0,
        attraction_horizontal: 0
    };

    /**
     * Valid langages flags
     * @static
     */

    static validLangages = {
        fr: "Français",
        en: "English",
    };

    /**
     * List of valid values for the links stroke
     * Apply to config form
     * @static
     */

    static validLinkStrokes = ['simple', 'double', 'dotted', 'dash'];

    static isInvalidPath (path) {
        if (!path) { return false; }

        if (fs.existsSync(path) === false) {
            return true;
        }

        return false;
    }

    static isInvalidNumber (optionName, number) {
        number = Number(number);

        if (isNaN(number) === false && number >= Config.minValues[optionName]) {
            return false; }

        return true;
    }

    static isInvalidLangage (lang) {
        if (Config.validLangages[lang] === undefined) {
            return false; }

        return true;
    }

    static isInvalidRecordTypes (recordTypes) {
        if (!recordTypes) { return false; }
        
        if (recordTypes['undefined'] === undefined) {
            return false; }

        for (const key in recordTypes) {
            if (typeof recordTypes[key] !== 'string') {
                return false; }
        }

        return true;
    }

    static isInvalidLinkTypes (linkTypes) {
        if (!linkTypes) { return false; }

        if (linkTypes['undefined'] === undefined) {
            return false; }

        for (const key in linkTypes) {
            if (
                typeof linkTypes[key] !== 'object' ||
                linkTypes[key]['color'] === undefined ||
                typeof linkTypes[key]['color'] !== 'string' ||
                linkTypes[key]['stroke'] === undefined ||
                typeof linkTypes[key]['stroke'] !== 'string' ||
                Config.validLinkStrokes.includes(linkTypes[key]['stroke']) === false
            )
            {
                return false;
            }
        }

        return true;
    }

    /**
     * Create a user config.
     * @param {object} opts - Options to change from current config or the base config
     * @param {string} path - Path to config file (JSON or YAML)
     */

    constructor (opts = undefined) {
        const filePath = Config.getFilePath();

        /**
         * All options & their value from the config
         * @type object
         */
        this.opts;

        /**
         * Path of the config JSON/YAML file
         * @type string
         */
        this.path;

        if (fs.existsSync(filePath) === false) {
            this.opts = Config.base;
            this.save();
        } else {
            this.path = filePath;
            this.opts = Object.assign(Config.base, this.get());
        }

        if (!this.opts) {
            this.opts = Config.base;
            return;
        }

        this.opts = Object.assign(this.opts, opts);

        /**
         * List of invalid fields
         * @type array
         */
        this.report = [];

        this.verif();
    }

    /**
     * Save the config options to the (file) path
     * @return {mixed} - True if the config file is saved, false if fatal error
     * or the errors array
     */

    save () {
        try {
            if (this.isValid() === false) {
                return; }

            const filePath = Config.getFilePath();

            switch (path.extname(filePath)) {
                case '.json':
                    fs.writeFileSync(filePath, JSON.stringify(this.opts));
                    break;

                case '.yml':
                    fs.writeFileSync(filePath, yml.dump(this.opts));
                    break;
            }

            console.log('\x1b[32m', 'Save config file', '\x1b[0m');

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * Get config options from the (config file) path
     * @return {mixed} - Config option or undefined if errors
     */

    get () {
        try {
            let fileContent = fs.readFileSync(this.path, 'utf8');

            switch (path.extname(this.path)) {
                case '.json':
                    fileContent = JSON.parse(fileContent);
                    break;

                case '.yml':
                    fileContent = yml.safeLoad(fileContent);
                    break;
            }

            return fileContent;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * Verif if the config options are correct
     */

    verif () {
        const paths = [
            'files_origin',
            'export_target',
            'csl',
            'bibliography',
            'csl_locale',
            'css_custom',
        ].filter((option) => {
            return Config.isInvalidPath(this.opts[option]);
        }).map((invalidPath) => {
            return invalidPath;
        });

        const numbers = [
            'focus_max',
            'graph_text_size',
            'attraction_force',
            'attraction_distance_max',
            'attraction_vertical',
            'attraction_horizontal'
        ].filter((option) => {
            return Config.isInvalidNumber(option, this.opts[option]);
        }).map((invalidNumber) => {
            return invalidNumber;
        });

        const bools = [
            'history',
            'graph_highlight_on_hover',
            'graph_arrows',
            'devtools',
            'minify'
        ].filter((option) => {
            return typeof this.opts[option] !== 'boolean';
        }).map((invalidBool) => {
            return invalidBool;
        });

        const record_types = (
            Config.isInvalidRecordTypes(this.opts['record_types']) ?
            null : 'record_types'
        );

        const link_types = (
            Config.isInvalidLinkTypes(this.opts['link_types']) ?
            null : 'link_types'
        );

        const lang = (
            Config.isInvalidLangage(this.opts['lang']) ?
            null : 'lang'
        );

        this.report = [...paths, ...numbers, ...bools, record_types, link_types, lang]
            .filter(invalidOption => invalidOption !== null);
    }

    /**
     * Check 'this.report' array.
     * If values are strings true, or empty arrays : TRUE
     * else : FALSE
     * @returns {boolean}
     */

    isValid () {
        for (const key in this.report) {
            if (this.report[key] === true) {
                continue; }

            if (
                Array.isArray(this.report[key]) === true &&
                this.report[key].length === 0
            )
            {
                continue;
            }

            return false;
        }

        return true;
    }

    /**
     * Tranform 'this.report' array (contains error list) to a string
     * @returns {string}
     */

    writeReport () {
        return this.report
            .map((invalidOption) => {
                return lang.config.errors[invalidOption][this.opts.lang];
            })
            .join(', ');
    }

    /**
     * If the config allow citeproc process
     * @returns {boolean}
     */

    canCiteproc () {
        if (
            this.opts['csl'] === '' ||
            this.opts['bibliography'] === '' ||
            this.opts['csl_locale'] === ''
        )
        {
            return false;
        }

        return true;
    }

    /**
     * If the config allow css_custom process
     * @returns {boolean}
     */

    canCssCustom () {
        if (this.opts['css_custom'] === '') {
            return false; }

        return true;
    }
}
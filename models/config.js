/**
 * @file Configuration administration
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

const path = require('path')
    , fs = require('fs')
    , yml = require('js-yaml');

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
        link_types: { undefined: { stroke: 'simple', color: '#e1e1e1' } },
        graph_background_color: '#ffffff',
        graph_highlight_color: '#ff6a6a',
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
        lang: 'fr'
    };

    /**
     * Get the context of the process
     * @returns {'electron', 'other'} - 'electron' or 'other'
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

    static isInvalidViews (views) {
        for (const viewName in views) {
            const viewKey = views[viewName];
            const viewKeyDecode = Buffer.from(viewKey, 'base64').toString();
            let viewKeyJson

            try {
                viewKeyJson = JSON.parse(viewKeyDecode);
            } catch (err) {
                return false;
            }
        }

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
     * Get config options from the (config file) path
     * @param {string} - Path to a config file
     * @return {object} - Config option or base config (Config.base) if errors
     */

    static get (configFilePath) {
        if (configFilePath === undefined || fs.existsSync(configFilePath) === false) {
            configFilePath = Config.getFilePath();
        }

        try {
            let fileContent = fs.readFileSync(configFilePath, 'utf8');

            switch (path.extname(configFilePath)) {
                case '.json':
                    fileContent = JSON.parse(fileContent);
                    break;

                case '.yml':
                    fileContent = yml.load(fileContent);
                    break;
            }

            return fileContent;
        } catch (error) {
            return Config.base;
        }
    }

    /**
     * Config opts to overwrite the graph config for generate sample cosmoscope
     * @return {object} - Config.opts for sample
     */

    static getSampleConfig () {
        const opts = Config.get()
            , lang = require('./lang');

        return Object.assign({}, Config.base, {
            files_origin: path.join(__dirname, '../sample', opts.lang),
            record_types: {
                documentation: '#147899',
                important: '#aa0000'
            },
            attraction_force: 600,
            attraction_distance_max: 800,
            graph_text_size: 15,
            title: lang.getFor(lang.i.demo.title),
            description: lang.getFor(lang.i.demo.description),
            lang: opts.lang
        })
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

        if (fs.existsSync(filePath) === false) {
            this.opts = Config.base;
            this.save();
        } else {
            this.opts = Object.assign({}, Config.base, Config.get());
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

        if (this.isValid() === false) {
            this.fix();
        }
    }

    /**
     * Save the config options to the (file) path
     * @return {boolean} - True if the config file is saved, false if fatal error
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
     * Store invalid fields into this.report
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
            'devtools'
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

        const views = (
            Config.isInvalidViews(this.opts['views']) ?
            null : 'views'
        );

        this.report = [...paths, ...numbers, ...bools, record_types, link_types, lang, views]
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
     * Fix the config : for each invalid option, get the Config.base value
     */

    fix () {
        for (const invalidOpt of this.report) {
            this.opts[invalidOpt] = Config.base[invalidOpt];
        }
    }

    /**
     * Tranform 'this.report' array (contains error list) to a string
     * @returns {string}
     */

    writeReport () {
        const lang = require('./lang');

        return this.report
            .map((invalidOption) => {
                if (Object.keys(Config.minValues).includes(invalidOption)) {
                    return lang.getWith(lang.i.config.errors[invalidOption], [Config.minValues[invalidOption]]);
                }
                return lang.getFor(lang.i.config.errors[invalidOption]);
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
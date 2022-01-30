/**
 * @file Manage records directories and config
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

const path = require('path')
    , fs = require('fs');

const Config = require('./config')
    , lang = require('./lang');

/**
 * Class to manage the records directories
 */

module.exports = class Repositories {
    /**
     * Get the repositories file path
     * @returns {string}
     * @static
     */

    static getFilePath () {
        const context = Config.getContext();

        if (context === 'electron') {
            const { app } = require('electron');
            return path.join(app.getPath('userData'), 'repositories.json');
        }
        
        return path.join(__dirname, '../../', 'repositories.json');
    }

    /**
     * Get repositories list from the (repositories file) path
     * @return {array} - Array of repository object
     */

    static get () {
        const configFilePath = Repositories.getFilePath();

        try {
            let fileContent = fs.readFileSync(configFilePath, 'utf8');
            fileContent = JSON.parse(fileContent);

            return fileContent;
        } catch (error) {
            return [];
        }
    }

    /**
     * Manage repositories.
     */

    constructor () {
        this.list = Repositories.get();
        this.report = [];
    }

    add (name, path, opts) {
        if (!name) {
            this.report.push(lang.getFor(lang.i.config.errors.no_name))
            return;
        }
        if (this.get(name) !== undefined) {
            this.report.push(lang.getFor(lang.i.config.errors.name_already_used))
            return;
        }
        if (fs.existsSync(path) === false) {
            this.report.push(lang.getFor(lang.i.config.errors.invalid_path))
            return;
        }

        const config = new Config(opts);

        if (config.isValid() === false) {
            this.report.push(config.writeReport());
            return;
        }

        this.list.push({
            name: name,
            path: path,
            opts: opts
        })
    }

    isValid () {
        return (this.report.length === 0);
    }

    writeReport () {
        return this.report.join(',');
    }

    get (name) {
        return this.list.find(item => item.name === name);
    }

    save () {
        if (this.isValid() === false) {
            return false;
        }

        const filePath = Repositories.getFilePath();

        try {
            fs.writeFileSync(filePath, JSON.stringify(this.list));

            console.log('\x1b[32m', 'Save repositories file', '\x1b[0m');
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
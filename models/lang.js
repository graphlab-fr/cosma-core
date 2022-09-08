/**
 * @file Reading this file of the interface messages in several langagues
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

const path = require('path')
    , fs = require('fs')
    , yml = require('js-yaml');

const config = require('./config').get();

const file = fs.readFileSync(path.join(__dirname, '../i18n.yml'));
const content = yml.load(file);

module.exports = {
    i: content,

    /**
     * Get the current used langage flag
     * @type string
     */

    flag: config.lang,

    /**
     * Get the translate for a multilingual object
     * @param {object} i - Object with lang flag, as 'fr'
     * @returns {string} - The string that corresponds to the optional language
     * @example
     * lang.getFor({
     *    fr: 'En français'
     *    en: 'In English'
     * })
     * 
     * lang.getFor(lang.i.windows.record)
     */

    getFor (i) {
        return i[config.lang];
    },

    /**
     * Get the translate for a object and replace $ vars
     * @param {object} i - Object with lang flag, as 'fr'
     * @param {array} substitutes - Array of replacement : key 0 corresponds to the $1
     * @returns {string} - The string that corresponds to the optional language
     * @example
     * lang.getFor({
     *    fr: 'Pour le fichier $1'
     *    en: 'For the $1 file'
     * }, [fileName])
     */

    getWith (i, substitutes) {
        let str = i[config.lang];

        for (let y = 0; y < substitutes.length; y++) {
            const subst = substitutes[y];

            const I = y + 1;

            str = str.replaceAll('$'+I, subst);
        }

        return str;
    }
};
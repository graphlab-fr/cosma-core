/**
 * @file Reading this file of the interface messages in several langagues
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

const path = require('path')
    , fs = require('fs')
    , yml = require('js-yaml');

const file = fs.readFileSync(path.join(__dirname, '../lang.yml'));
const content = yml.load(file);

module.exports = content;
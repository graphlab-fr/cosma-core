const path = require('path')
    , fs = require('fs')
    , fetch = require('node-fetch');

const { config: fakeConfig, records, bib: fakeLibrary } = require('./utils/fake');

const Cosmocope = require('./models/cosmoscope')
    , Template = require('./models/template')
    , Bibliography = require('./models/bibliography');

Promise.all([
    fetchFile('https://www.zotero.org/styles/iso690-author-date-fr-no-abstract'),
    fetchFile('https://raw.githubusercontent.com/citation-style-language/locales/6b0cb4689127a69852f48608b6d1a879900f418b/locales-fr-FR.xml')
]).then(([cslStyle, xmlLocal]) => {
    const graph = new Cosmocope(records, fakeConfig.opts, ['fake'])
        , bibliography = new Bibliography(fakeLibrary, cslStyle, xmlLocal, records)
        , { html } = new Template(graph, bibliography, ['publish', 'css_custom']);

    fs.writeFile('cosmoscope.html', html, (err) => {
        if (err) {return console.error('Err.', '\x1b[0m', err)}
        console.log('\x1b[34m', 'Cosmoscope generated', '\x1b[0m');
    });
});

function fetchFile(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                response.text()
                    .then(resolve)
                    .catch(reject);
            })
            .catch(reject);
    });
}
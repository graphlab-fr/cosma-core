const fs = require('fs');

const { fetchFileText } = require('./utils/misc');

const { config: fakeConfig, records, bib: fakeLibrary } = require('./utils/fake');

const Cosmocope = require('./models/cosmoscope')
    , Template = require('./models/template');

Promise.all([
    fetchFileText('https://www.zotero.org/styles/iso690-author-date-fr-no-abstract'),
    fetchFileText('https://raw.githubusercontent.com/citation-style-language/locales/6b0cb4689127a69852f48608b6d1a879900f418b/locales-fr-FR.xml')
]).then(([cslStyle, xmlLocal]) => {
    const graph = new Cosmocope(records, fakeConfig.opts, ['fake'])
        , { html } = new Template(graph, ['publish', 'css_custom', 'citeproc']);

    fs.writeFile('cosmoscope.html', html, (err) => {
        if (err) {return console.error('Err.', '\x1b[0m', err)}
        console.log('\x1b[34m', 'Cosmoscope generated', '\x1b[0m');
    });
})
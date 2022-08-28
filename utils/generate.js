const fs = require('fs')
    , path = require('path');

const { config: fakeConfig, records, bib: fakeLibrary } = require('./fake');

const Cosmocope = require('../models/cosmoscope')
    , Template = require('../models/template');

module.exports = {
    cosmocope: function(savePath, templateOptions = ['publish', 'css_custom']) {
        return new Promise((resolve, reject) => {
            const graph = new Cosmocope(records, fakeConfig.opts, ['fake'])
                , { html } = new Template(graph, templateOptions);

            savePath = path.join(savePath, 'cosmoscope.html')
        
            fs.writeFile(savePath, html, (err) => {
                if (err) { reject(err) }
                resolve({
                    nbRecords: graph.records.length,
                    savePath
                });
            });
        })
    },
    opensphere: function(savePath, templateOptions = ['publish', 'css_custom']) {
        
    }
};
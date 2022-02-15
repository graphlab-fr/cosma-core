const path = require('path')
    , fs = require('fs');

const Graph = require('./models/graph')
    , Template = require('./models/template');

const graph = new Graph(['fake'])
    , template = new Template(graph);

fs.writeFile('cosmoscope.html', template.html, (err) => {
    if (err) {return console.error('Err.', '\x1b[0m', err)}
    console.log('\x1b[34m', 'Cosmoscope generated', '\x1b[0m', `(${graph.files.length} records)`)
});
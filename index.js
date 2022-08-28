const fs = require('fs')
    , path = require('path');

const { cosmocope } = require('./utils/generate');

const tempFolderPath = path.join(__dirname, 'temp');
if (fs.existsSync(tempFolderPath) === false) {
    fs.mkdirSync(tempFolderPath);
}

cosmocope(tempFolderPath)
    .then(({ nbRecords }) => console.log('\x1b[34m', 'Cosmoscope generated', '\x1b[0m', `(${nbRecords} records)`));
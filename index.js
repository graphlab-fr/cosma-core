const fs = require('fs')
    , path = require('path');

const { cosmocope, opensphere } = require('./utils/generate');

const tempDirPath = path.join(__dirname, 'temp');

cosmocope(tempDirPath)
    .then(({ nbRecords }) => console.log('\x1b[34m', 'Cosmoscope generated', '\x1b[0m', `(${nbRecords} records)`))
    .catch(err => console.error('\x1b[31m', 'Err.', '\x1b[0m', err));

opensphere(tempDirPath)
    .then(({ nbRecords }) => console.log('\x1b[34m', 'Opensphere generated', '\x1b[0m', `(${nbRecords} records)`))
    .catch(err => console.error('\x1b[31m', 'Err.', '\x1b[0m', err));
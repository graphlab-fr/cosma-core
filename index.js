// const fs = require('fs')
//     , path = require('path');

const { cosmocope, opensphere, tempDirPath } = require('./utils/generate');
// const performance = require('./utils/performance');

// cosmocope(tempDirPath)
//     .then(({ nbRecords }) => console.log('\x1b[34m', 'Cosmoscope generated', '\x1b[0m', `(${nbRecords} records)`))
//     .catch(err => console.error('\x1b[31m', 'Err.', '\x1b[0m', err));

// opensphere(tempDirPath)
//     .then(({ nbRecords }) => console.log('\x1b[34m', 'Opensphere generated', '\x1b[0m', `(${nbRecords} records)`))
//     .catch(err => console.error('\x1b[31m', 'Err.', '\x1b[0m', err));

// performance();

const { execute: webpackExecute } = require('./utils/webpack');

webpackExecute('development')
    .then(() => {
        cosmocope(tempDirPath)
            .then(({ nbRecords }) => console.log('\x1b[34m', 'Cosmoscope generated', '\x1b[0m', `(${nbRecords} records)`))
            .catch(err => console.error('\x1b[31m', 'Err.', '\x1b[0m', err));
    })
    .catch((err) => { console.log(err); })
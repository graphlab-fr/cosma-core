/**
 * @file Generate a fake cosmoscope.
 * @author Guillaume Brioudes
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

const path = require('path');
const { faker } = require('@faker-js/faker')
    , nunjucks = require('nunjucks');

const Config = require('../models/config')
    , Cosmoscope = require('../models/cosmoscope')
    , Record = require('../models/record');

const bib = require('./fake-bib.json');

const nodesNb = 50;
const tags = [];
const ids = [];
const files = [];
const bibKeys = Object.values(bib).map(({ id }) => `${id}`);

let config = Config.get(path.join(__dirname, 'fake-config.yml'));
config = new Config(config);
const { record_types: recordTypes } = config.opts;
config.opts['css_custom'] = path.join(__dirname, 'fake.css');
config.opts['bibliography'] = path.join(__dirname, 'fake-bib.json');
config.opts['views'] = {
    [faker.word.verb()]: fakeView(),
    [faker.word.verb()]: fakeView(),
    [faker.word.verb()]: fakeView()
}

for (let i = 0; i < 5; i++) {
    tags.push(faker.random.word());
}
for (let i = 0; i < nodesNb; i++) {
    ids.push(Record.generateOutDailyId() + i);
}

for (const fileId of ids) {
    const templateEngine = new nunjucks.Environment(
        new nunjucks.FileSystemLoader(path.join(__dirname))
    );
    const content = templateEngine.render('fake-record.njk', {
        ids,
        imgSrc: faker.image.animals(),
        bibKeys
    });

    files.push({
        path: undefined,
        name: faker.system.commonFileName('md'),
        lastEditDate: faker.date.past(),
        content,
        metas: {
            id: fileId,
            title: faker.name.jobTitle(),
            type: faker.helpers.arrayElement(Object.keys(recordTypes)),
            tags: [
                faker.helpers.arrayElement(tags),
                faker.helpers.arrayElement(tags)
            ]
        }
    })
}

const records = Cosmoscope.getRecordsFromFiles(files, config.opts);

module.exports = {
    config,
    records,
    bib
}

function fakeView() {
    const id = faker.helpers.arrayElement(ids);

    const viewJson = {
        recordId: id,
        filters: [
            faker.helpers.arrayElement(Object.keys(recordTypes)),
            faker.helpers.arrayElement(Object.keys(recordTypes))
        ],
        focus: {
            fromRecordId: id,
            level: 1
        }
    }

    const viewDecodeKey = JSON.stringify(viewJson);
    const viewEncodeKey = Buffer.from(viewDecodeKey, 'utf-8').toString('base64');

    return viewEncodeKey;
}
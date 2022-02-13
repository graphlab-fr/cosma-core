/**
 * @file Generate a fake cosmoscope.
 * @author Guillaume Brioudes
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

const { faker } = require('@faker-js/faker');

const Record = require('../models/record')
    , Config = require('../models/config');

const NB_NODES = 50
    , fakeRecordTypes = {
        'idea': '#e41a1c',
        'concept': '#377eb8',
        'note': '#4daf4a',
        'person': '#984ea3',
        'place': '#ff7f00',
        'event': '#ffff33',
        'task': '#a65628',
        'object': '#f781bf'
    }
    ,fakeLinkTypes = {
        'g': {
            'stroke': 'dotted',
            'color': '#e1e1e1'
        },
        's': {
            'stroke': 'dash',
            'color': '#e1e1e1'
        }
    }

let fakeFiles = [];
let fakeIds = [];

for (let i = 0; i < NB_NODES; i++) {
    let fakeId = Record.generateOutDailyId() + i

    fakeIds.push(fakeId);

    fakeFiles.push(
        {
            name: faker.system.commonFileName('md'),
            filePath: faker.system.filePath(),
            lastEditDate: faker.time.recent('unix'),
            metas: {
                title: faker.name.title(),
                type: faker.helpers.randomize(Object.keys(fakeRecordTypes)),
                id: fakeId,
                tags: []
            },
            content: [
                faker.lorem.paragraphs(2, fakeLink()),
                [fakeMardownQuote(), fakeLink()].join(' '),
                faker.lorem.paragraphs(1),
                [fakeMardownTab(3, 4), fakeLink()].join(' '),
                faker.lorem.paragraphs(1),
                fakeImage(),
                faker.lorem.paragraphs(1)
            ].join('\n\n')
        }
    )
}

module.exports = {
    files: fakeFiles,
    config: Object.assign({}, Config.base, {
        record_types: fakeRecordTypes,
        link_types: fakeLinkTypes
    })
};

function fakeMardownTab (nbCols, nbRows) {
    let rows = [];
    let header = []
        , headerSepratation = []

    for (let i = 0; i < nbCols; i++) {
        header.push(faker.word.adjective());
        headerSepratation.push('-');
    }

    rows.push(
        header.join('|'),
        headerSepratation.join('|')
    )

    for (let i = 0; i < nbRows; i++) {
        let row = [];

        for (let j = 0; j < nbCols; j++) {
            row.push(faker.lorem.sentence(3))
        }

        rows.push(
            row.join('|')
        )
    }

    return rows.join('\n');
}

function fakeMardownQuote () {
    return `> ${faker.lorem.paragraph(2)}`
}

function fakeLink () {
    let linkPrefix = '';
    if ((fakeIds.length % 12) === 0) {
        linkPrefix = faker.helpers.randomize(Object.keys(fakeLinkTypes)) + ':'
    }

    return `[[${linkPrefix}${faker.helpers.randomize(fakeIds)}]]`
}

function fakeImage () {
    return `![${faker.lorem.sentence(1)}](${faker.random.image()})`
}
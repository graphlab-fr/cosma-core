/**
 * @file Generate a fake cosmoscope.
 * @author Guillaume Brioudes
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

const path = require('path')

const { faker } = require('@faker-js/faker');

const Record = require('../models/record')
    , Config = require('../models/config');

const NB_NODES = 50
    , fakeRecordTypes = {
        'undefined': '#858585',
        'idea': '#e41a1c',
        'concept': '#377eb8',
        'note': '#4daf4a',
        'person': '#984ea3',
        'place': '#ff7f00',
        'event': '#ffff33',
        'task': '#a65628',
        'object': '#f781bf'
    }
    , fakeLinkTypes = {
        'undefined': { 'stroke': 'simple', 'color': '#e1e1e1' },
        'g': {
            'stroke': 'dotted',
            'color': '#e1e1e1'
        },
        's': {
            'stroke': 'dash',
            'color': '#e1e1e1'
        }
    }

let fakeFiles = []
    , fakeIds = (() => {
        const ids = [];
        for (let i = 0; i < NB_NODES; i++) ids.push(Record.generateOutDailyId() + i)
        return ids;
    })()
    , fakeTags = [];

for (let i = 0; i < 20; i++) {
    fakeTags.push(faker.random.word());
}


for (let i = 0; i < NB_NODES; i++) {
    let fakeId = fakeIds[i];

    fakeFiles.push(
        {
            name: faker.system.commonFileName('md'),
            filePath: faker.system.filePath(),
            lastEditDate: faker.date.past(),
            metas: {
                title: faker.name.title(),
                type: faker.random.arrayElement(Object.keys(fakeRecordTypes)),
                id: fakeId,
                tags: [
                    faker.random.arrayElement(fakeTags),
                    faker.random.arrayElement(fakeTags)
                ]
            },
            content: [
                faker.lorem.paragraphs(3, fakeLink()),
                '# Main title',
                '<div class="box info">Custom CSS box</div>',
                '## Sub title',
                [fakeMardownQuote(), fakeLink(), fakeLink()].join(' '),
                [faker.lorem.paragraphs(1), '{.red}'].join(' '),
                '### Sub-sub title',
                [fakeMardownTab(3, 4), fakeLink(), fakeLink()].join(' '),
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
        link_types: fakeLinkTypes,
        title: 'Test',
        description: 'This cosmoscope was automatically generated with example data in order to test the functionality of the software.',
        keywords: ['test', 'sample'],
        link_symbol: '🔗',
        lang: 'en',
        views: {
            test1: fakeView(),
            test2: fakeView(),
            test3: fakeView()
        },
        css_custom: path.join(__dirname, 'fake.css')
    }),
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
        linkPrefix = faker.random.arrayElement(Object.keys(fakeLinkTypes)) + ':'
    }

    return `[[${linkPrefix}${faker.random.arrayElement(fakeIds)}]]`
}

function fakeImage () {
    return `![${faker.lorem.sentence(1)}](${faker.image.animals()})`
}

function fakeView () {
    const id = faker.random.arrayElement(fakeIds);

    const viewJson = {
        recordId: id,
        filters: [
            faker.random.arrayElement(Object.keys(fakeRecordTypes)),
            faker.random.arrayElement(Object.keys(fakeRecordTypes))
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
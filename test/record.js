const fs = require('fs')
    , path = require('path')
    , { parse } = require("csv-parse/sync");

const assert = require('assert')
    , chai = require('chai')
    , chaiFs = require('chai-fs');

chai.use(chaiFs);
const should = chai.should();

const Record = require('../models/record')
    , Cosmocope = require('../models/cosmoscope')
    , Link = require('../models/link')
    , Config = require('../models/config')
    , Bibliography = require('../models/bibliography');

const tempFolderPath = path.join(__dirname, '../temp');

describe('Record', () => {
    describe('check', () => {
        it('should be invalid a record without title', () => {
            const validRecord = new Record(
                undefined,
                undefined
            );
            assert.ok(validRecord.isValid() === false);
        });

        it('should split tags strings in array', () => {
            assert.deepStrictEqual(
                new Record(
                    undefined,
                    'the title',
                    undefined,
                    'tag 1,tag 2'
                ),
                new Record(
                    undefined,
                    'the title',
                    undefined,
                    ['tag 1', 'tag 2']
                )
            );
            assert.deepStrictEqual(
                new Record(
                    undefined,
                    'the title',
                    undefined,
                    ','
                ),
                new Record(
                    undefined,
                    'the title',
                    undefined,
                    []
                )
            );
        });

        it('should convert undefined type in array', () => {
            let record = new Record(
                undefined,
                'the title',
                undefined
            );
            assert.deepStrictEqual(
                record.type,
               ['undefined']
            );
        });

        it('should convert type in array', () => {
            assert.deepStrictEqual(
                new Record(
                    undefined,
                    'the title',
                    'type 1'
                ),
                new Record(
                    undefined,
                    'the title',
                    ['type 1']
                )
            );
        });
    });

    describe('register', () => {
        it('should register only valid record types', () => {
            const record = new Record(
                undefined,
                'the title',
                ['important', 'done', 'invalid type'],
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                {
                    record_types: {
                        'undefined': { fill: '#ccc', stroke: '#ccc' },
                        'important': { fill: '#ccc', stroke: '#ccc' },
                        'done': { fill: '#ccc', stroke: '#ccc' }
                    }
                }
            );
            assert.deepStrictEqual(
                record.type,
                ['important', 'done', 'undefined']
            );
        });

        it('should register only valid link types', () => {
            const record = new Record(
                undefined,
                'the title',
                undefined,
                undefined,
                undefined,
                undefined,
                [
                    {
                        context: 'lorem ipsum',
                        type: 'g',
                        source: { id: 1, title: 'Record 1' },
                        target: { id: 2, title: 'Record 2' }
                    },
                    {
                        context: 'lorem ipsum',
                        type: 'invalid type',
                        source: { id: 3, title: 'Record 3' },
                        target: { id: 4, title: 'Record 4' }
                    }
                ],
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                {
                    link_types: {
                        'undefined': { stroke: 'double', color: '#ccc' },
                        'g': { stroke: 'simple', color: '#ccc' }
                    }
                }
            );
            const links = Link.getLinksFromRecords([record]);
            assert.deepEqual(
                links,
                [
                    {
                        id: 0,
                        context: 'lorem ipsum',
                        type: 'g',
                        shape: { stroke: 'simple', dashInterval: null },
                        color: '#ccc',
                        colorHighlight: Config.base.graph_highlight_color,
                        source: 1,
                        target: 2,
                        report: []
                    },
                    {
                        id: 1,
                        context: 'lorem ipsum',
                        type: 'undefined',
                        shape: { stroke: 'double', dashInterval: null },
                        color: '#ccc',
                        colorHighlight: Config.base.graph_highlight_color,
                        source: 3,
                        target: 4,
                        report: []
                    }
                ]
            );
        });
    });

    describe('ymlFrontMatter', () => {
        it('should be render a string from some attributes', () => {
            const recordId = Record.generateId();
            let recordYmlFrontMatter = new Record(
                recordId,
                'the title',
                undefined,
                ['tag 1', 'tag 2'],
                undefined,
                'the content',
                undefined,
                undefined,
                undefined,
                undefined,
                Bibliography.getBibliographicRecordsFromList(['author1', 'author2']),
                'image.jpg'
            ).ymlFrontMatter;

            let recordYmlFrontMatterExpected =
`---
title: the title
id: ${recordId}
type:
  - undefined
tags:
  - tag 1
  - tag 2
references:
  - author1
  - author2
thumbnail: image.jpg
---

`;
            assert.strictEqual(recordYmlFrontMatter, recordYmlFrontMatterExpected);

            recordYmlFrontMatter = new Record(
                recordId,
                'the title',
                ['type 1', 'type 2'],
                [],
                {
                    name: 'Guillaume',
                    lastname: 'Brioudes',
                    foo: null,
                    bar: undefined,
                    isDead: false 
                },
                'the content',
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                {
                    record_types: {
                        'undefined': { fill: 'gray', stroke: 'gray' },
                        'type 1': { fill: 'yellow', stroke: 'yellow' },
                        'type 2': { fill: 'green', stroke: 'green' }
                    }
                }
            ).ymlFrontMatter;

            recordYmlFrontMatterExpected =
`---
title: the title
id: ${recordId}
type:
  - type 1
  - type 2
name: Guillaume
lastname: Brioudes
isDead: false
---

`;
            assert.strictEqual(recordYmlFrontMatter, recordYmlFrontMatterExpected);
        });
    });

    describe('File save', () => {
        let record;

        const content = 'Lorem ipsum dolor est'
            , recordConfig = { files_origin: tempFolderPath }
            , fileName = 'My record.md'
            , filePath = path.join(tempFolderPath, fileName);

        before(() => {
            if (fs.existsSync(tempFolderPath) === false) {
                fs.mkdirSync(tempFolderPath);
            }
        });

        afterEach(() => {
            fs.unlinkSync(filePath);
        });

        it('should save the record as file on temp folder', () => {
            record = new Record(
                undefined,
                'My record',
                undefined,
                undefined,
                undefined,
                content,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                recordConfig
            );
            const result = record.saveAsFile(true);

            result.should.be.true;
            filePath.should.be.a.file();
        });

        it('should save the record with a clean file name', () => {
            record = new Record(
                undefined,
                'My [@récörd?!]',
                undefined,
                undefined,
                undefined,
                content,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                recordConfig
            );
            const result = record.saveAsFile(true);

            result.should.be.true;
            filePath.should.be.a.file();
        });

        it('should save warn file overwritting', () => {
            record = new Record(
                undefined,
                'My record',
                undefined,
                undefined,
                undefined,
                content,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                recordConfig
            );
            const result1 = record.saveAsFile();
            const result2 = record.saveAsFile();

            result1.should.be.true;
            result2.should.be.equal('overwriting');
        });

        it('should save record content', () => {
            record = new Record(
                undefined,
                'My record',
                undefined,
                undefined,
                undefined,
                content,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                recordConfig
            );
            record.saveAsFile();
            const fileContent = record.getYamlFrontMatter() + content;
            filePath.should.be.a.file().with.content(fileContent);
        });
    });

    describe('Batch', () => {
        const line = {
            'title': 'Paul Otlet',
            'type:étude': 'documentation',
            'type:relation': 'ami',
            'tag:genre': 'homme',
            'content:biography': 'Lorem ipsum...',
            'content:notes': 'Lorem ipsum...',
            'meta:prenom': 'Paul',
            'meta:nom': 'Otlet',
            'time:begin': '1868',
            'time:end': '1944',
            'thumbnail': 'photo.jpg',
            'references': 'otlet1934,otlet1934'
        };

        it('should format minimal line in deep for batch', () => {
            assert.deepStrictEqual(
                Record.getDeepFormatedDataFromCsvLine({
                    'title': 'Paul Otlet',
                    'type': 'documentation',
                    'tag': 'homme',
                    'content': 'Lorem ipsum...',
                    'thumbnail': 'photo.jpg',
                    'references': 'otlet1934'
                }),
                {
                    'id': undefined,
                    "title" : "Paul Otlet",
                    "type" : {
                        "undefined": "documentation"
                    },
                    "metas" : {},
                    "tags": {
                        "undefined": "homme"
                    },
                    "time": {
                        "begin": undefined,
                        "end" : undefined,
                    },
                    "content": {
                        "undefined" : "Lorem ipsum..."
                    },
                    "thumbnail" : "photo.jpg",
                    "references" : ["otlet1934"]
                }
            );
        });

        it('should format line in deep for batch', () => {
            assert.deepStrictEqual(
                Record.getDeepFormatedDataFromCsvLine(line),
                {
                    'id': undefined,
                    "title" : "Paul Otlet",
                    "type" : {
                        "étude": "documentation",
                        "relation" : "ami"
                    },
                    "metas" : {
                        "prenom": "Paul",
                        "nom" : "Otlet"
                    },
                    "tags": {
                        "genre": "homme"
                    },
                    "time": {
                        "begin": "1868",
                        "end" : "1944",
                    },
                    "content": {
                        "biography" : "Lorem ipsum...",
                        "notes" : "Lorem ipsum..."
                    },
                    "thumbnail" : "photo.jpg",
                    "references" : ["otlet1934", "otlet1934"]
                }
            );
        });

        it('should format line for batch', () => {
            assert.deepStrictEqual(
                Record.getFormatedDataFromCsvLine(line),
                {
                    'id': undefined,
                    "title" : "Paul Otlet",
                    "type" : ['documentation', 'ami'],
                    "metas" : {
                        "prenom": "Paul",
                        "nom" : "Otlet"
                    },
                    "tags": ['homme'],
                    "begin": '1868',
                    "end": '1944',
                    "content": `<h3>biography</h3>\n\nLorem ipsum...\n\n<h3>notes</h3>\n\nLorem ipsum...`,
                    "thumbnail" : "photo.jpg",
                    "references" : ["otlet1934", "otlet1934"]
                }
            );
        });

        it('should format line for batch with several syntaxes', () => {
            const line = Record.getFormatedDataFromCsvLine({
                "title": "Paul Otlet",
                "type:domaine": 'type 1',
                "type": 'type 2',
                "tag": "tag 1",
                "tag": "tag 2"
            });

            line.should.property('type').deep.equal(['type 1', 'type 2']);
            line.should.property('tags').deep.equal(['tag 2']);
        });

        describe('make file', () => {
            const fileName = 'Paul Otlet';
            const filePath = path.join(tempFolderPath, Record.getSlugFileName(fileName));
            afterEach(() => {
                fs.unlinkSync(filePath);
            });

            it('should batch a file from formated (csv) data', () => {
                const csv = parse(
`title     ,content ,type:nature,type:field,meta:prenom,meta:nom,tag:genre,time:begin,time:end,thumbnail,references
                     Paul Otlet,Lorem...,Personne   ,Histoire  ,Paul       ,Otlet   ,homme    ,1868      ,1944    ,image.png,otlet1934`,
                    { columns: true, trim: true, rtrim: true, skip_empty_lines: true }
                );
                const data = csv.map(line => Record.getFormatedDataFromCsvLine(line));
                const index = Cosmocope.getIndexToMassSave();
                const result = Record.massSave(data, index, { files_origin: tempFolderPath });

                result.should.be.true;
                filePath.should.be.a.file();
                
                const files = Cosmocope.getFromPathFiles(tempFolderPath);
                const record = Cosmocope.getRecordsFromFiles(files).find(({ title }) => title === fileName);
                assert.deepEqual(
                    record,
                    {
                        ...record,
                        title: 'Paul Otlet',
                        content: '\n\nLorem...',
                        metas: {'prenom' : 'Paul', 'nom' : 'Otlet'},
                        thumbnail: 'image.png'
                    }
                );
                record.bibliographicRecords[0].ids.should.to.deep.equal(new Set(['otlet1934']));
            });

            it('should batch a file from data', () => {
                const minimalData = [{
                    "title" : "Paul Otlet"
                }];
                const index = Cosmocope.getIndexToMassSave();
                const result = Record.massSave(minimalData, index, { files_origin: tempFolderPath });
    
                result.should.be.true;
                filePath.should.be.a.file();
            });
    
            it('should batch a file from data', () => {
                const data = [{
                    "title": "Paul Otlet",
                    "type" : ["Personne", "Histoire"],
                    "metas": {
                        "prenom" : "Paul",
                        "nom" : "Otlet"
                    },
                    "tags" : ["documentation"],
                    "begin" : "1868",
                    "end" : "1944",
                    "content" : "Lorem...",
                    "thumbnail" : "image.jpg",
                    "references" : ["otlet1934"]
                }];
                const index = Cosmocope.getIndexToMassSave();
                const result = Record.massSave(data, index, { files_origin: tempFolderPath });
    
                result.should.be.true;
                filePath.should.be.a.file();
            });
        });
    });
});
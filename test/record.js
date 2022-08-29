const fs = require('fs-extra')
    , path = require('path');

const assert = require('assert')
    , chai = require('chai')
    , chaiFs = require('chai-fs');

chai.use(chaiFs);
const should = chai.should();

const Record = require('../models/record'),
    Link = require('../models/link');

const tempFolderPath = path.join(__dirname, '../temp');

describe('Record', () => {
    describe('check', () => {
        it('should not be register errors if record get title', () => {
            const validRecord = new Record(
                undefined,
                'the title'
            );
            assert.ok(validRecord.isValid() === true);
        })
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
                        'undefined': '#ccc',
                        'important': '#ccc',
                        'done': '#ccc'
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
            ).ymlFrontMatter;

            let recordYmlFrontMatterExpected =
`---
title: the title
id: ${recordId}
type: undefined
tags:
  - tag 1
  - tag 2
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
                    lastname: 'Brioudes'
                },
                'the content'
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
---

`;
            assert.strictEqual(recordYmlFrontMatter, recordYmlFrontMatterExpected);
        });
    });

    describe.only('File save', () => {
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
            fs.emptyDirSync(tempFolderPath);
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
});
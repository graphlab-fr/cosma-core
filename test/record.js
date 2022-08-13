const assert = require('assert');

const Record = require('../models/record');

describe('Record verif', () => {
    describe('check', () => {
        it('should not be register errors if record get title', () => {
            const validRecord = new Record(
                undefined,
                'the title'
            );
            assert.ok(validRecord.isValid() === true);
        })
    });

    describe('references', () => {
        it('should not be register an error if reference is valid', () => {
            const referenceArray = [
                {
                    context: '',
                    source: {
                        id: 42,
                        title: 'title of source node',
                        type: 'undefined'
                    },
                    target: {
                        id: 42,
                        title: 'title of target node',
                        type: 'undefined'
                    }
                }
            ];
            assert.ok(Record.verifReferenceArray(referenceArray) === true);
        })
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
});
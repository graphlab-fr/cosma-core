const assert = require('assert');

const Graph = require('../models/graph'),
    Record = require('../models/record');
    // , { config: fakeOpts } = require('../utils/fake');

describe('Graph verif', () => {
    describe('params', () => {
        it('should register only valid params', () => {
            const graph = new Graph(
                undefined,
                undefined,
                ['sample', 'empty', 'invalid param']
            );
            assert.deepStrictEqual(
                graph.params,
                new Set(['sample', 'empty'])
            );
        })
    })

    describe('records', () => {
        it('should report duplicated records', () => {
            const graph = new Graph(
                [
                    new Record(
                        777,
                        'Record 1'
                    ),
                    new Record(
                        777,
                        'Record 2'
                    ),
                ]
            );
            assert.deepStrictEqual(
                graph.report.duplicates,
                [{ id: 777, title: 'Record 2' }]
            );
        })
    })
})
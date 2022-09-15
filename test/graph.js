const assert = require('assert');

const moment = require('moment');

const Graph = require('../models/graph')
    , Record = require('../models/record');

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

    describe('chronos', () => {
        it('should get begin and end timestamps from graph records', () => {
            const graph = new Graph(
                [
                    new Record(
                        undefined,
                        'Record 1',
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        '1901-01-01',
                        '1999-01-01'
                    ),
                    new Record(
                        undefined,
                        'Record 2',
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        '1999',
                        '2020-01-01'
                    ),
                    new Record(
                        undefined,
                        'Record 2',
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        '',
                        '1701-01-01'
                    )
                ]
            );
            assert.deepStrictEqual(
                graph.chronos,
                {
                    begin: new Date('1701-01-01').getTime() / 1000,
                    end: new Date('2020-01-01').getTime() / 1000
                }
            );
        });
    })
})
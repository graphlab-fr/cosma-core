const assert = require('assert');

const Graph = require('../models/graph')
    , { config: fakeOpts } = require('../utils/fake');

describe('Graph verif', () => {
    describe('entities', () => {
        it('should be throw all records types except "undefined"', () => {
            const graph = new Graph(['fake'], {
                record_types: {
                    'undefined': '#858585',
                    'ever-known-type': '#000000'
                }
            });

            const filesTypesRecord = new Set(graph.files.map(file => file.metas.type));
            assert.ok(filesTypesRecord.size === 1 && filesTypesRecord.has('undefined'));
        })

        it('should be throw all links types except "undefined"', () => {
            const graph = new Graph(['fake'], {
                link_types: {
                    'undefined': { 'stroke': 'simple', 'color': '#e1e1e1' },
                    'ever-known-type': { 'stroke': 'dotted', 'color': '#000000' }
                }
            });

            const filesTypesLink = new Set(
                graph.files.map(file => file.links.map(link => link.type)).flat()
            );
            assert.ok(filesTypesLink.size === 1 && filesTypesLink.has('undefined'));
        })

        // it('should be keep all record types', () => {
        //     const graph = new Graph(['fake'], fakeOpts);

        //     const filesTypesRecord = new Set(graph.files.map(file => file.metas.type));
        //     console.log(graph.config.getTypesRecords().size);
        //     assert.ok(
        //         filesTypesRecord.size === graph.config.getTypesRecords().size
        //     );
        // })
    })
})
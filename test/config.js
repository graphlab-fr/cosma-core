const assert = require('assert');

const Config = require('../models/config')
    , { config: fakeConfig } = require('../utils/fake');

describe('Config', () => {
    it('should be return error into report array for invalid origin selector', () => {
        const config = new Config({
            ...Config.base,
            select_origin: 'invalid value'
        });

        assert.deepStrictEqual(
            config.report,
            ['select_origin']
        );
    });

    it('should be return error into report array for invalid paths', () => {
        const config = new Config({
            ...Config.base,
            files_origin: '../no/exist/folder',
            nodes_origin: '../no/exist/folder',
            links_origin: '../no/exist/folder',
            images_origin: '../no/exist/folder',
            export_target: '../no/exist/folder',
            csl: '../no/exist/folder',
            bibliography: '../no/exist/folder',
            csl_locale: '../no/exist/folder',
            css_custom: '../no/exist/folder'
        });

        assert.deepStrictEqual(
            config.report,
            [
                'files_origin',
                'nodes_origin',
                'links_origin',
                'images_origin',
                'export_target',
                'csl',
                'bibliography',
                'csl_locale',
                'css_custom'
            ]
        );
    });

    it('should be return error into report array for invalid numbers', () => {
        const config = new Config({
            ...Config.base,
            focus_max: Config.minValues - 1,
            graph_text_size: Config.minValues - 1,
            attraction_force: Config.minValues - 1,
            attraction_distance_max: Config.minValues - 1,
            attraction_vertical: Config.minValues - 1,
            attraction_horizontal: Config.minValues - 1
        });

        assert.deepStrictEqual(
            config.report,
            [
                'focus_max',
                'graph_text_size',
                'attraction_force',
                'attraction_distance_max',
                'attraction_vertical',
                'attraction_horizontal'
            ]
        )
    });

    it('should be return error into report array for invalid booleans', () => {
        const config = new Config({
            ...Config.base,
            history: 'not a boolean',
            graph_highlight_on_hover: 'not a boolean',
            graph_arrows: 'not a boolean',
            devtools: 'not a boolean'
        });

        assert.deepStrictEqual(
            config.report,
            [
                'history',
                'graph_highlight_on_hover',
                'graph_arrows',
                'devtools'
            ]
        );
    });

    it('should be return error into report array for invalid types : missing undefined', () => {
        const config = new Config({
            ...Config.base,
            record_types: { not_undefined: '#000000' },
            link_types: { not_undefined: { stroke: 'simple', color: '#000000' } }
        });

        assert.deepStrictEqual(
            config.report,
            ['record_types', 'link_types']
        );
    });

    describe('type record', () => {
        it('should not return error for valid record type', () => {
            const config = new Config({
                ...Config.base,
                record_types: {
                    undefined: { fill: 'photo.jpg', stroke: 'green' }
                }
            });
    
            assert.deepStrictEqual(
                config.report,
                []
            );
        });
    
        it('should be return error into report array for invalid record type : miss fill', () => {
            const config = new Config({
                ...Config.base,
                record_types: {
                    undefined: { stroke: 'green' }
                }
            });
    
            assert.deepStrictEqual(
                config.report,
                ['record_types']
            );
        });

        it('should be return error into report array for empty record type', () => {
            const config = new Config({
                ...Config.base,
                record_types: {
                    undefined: { stroke: 'green', fill: 'green' },
                    '': { stroke: 'green', fill: 'green' }
                }
            });
    
            assert.deepStrictEqual(
                config.report,
                ['record_types']
            );
        });
    
        it('should be return error into report array for invalid record type : miss stroke', () => {
            const config = new Config({
                ...Config.base,
                record_types: {
                    undefined: { fill: 'green' }
                }
            });
    
            assert.deepStrictEqual(
                config.report,
                ['record_types']
            );
        });
    });


    describe('type link', () => {
        it('should be return error into report array for invalid link type : invalid stroke', () => {
            const config = new Config({
                ...Config.base,
                link_types: {
                    undefined: { stroke: 'invalid_stroke', color: '#000000' }
                }
            });
    
            assert.deepStrictEqual(
                config.report,
                ['link_types']
            );
        });
    
        it('should be return error into report array for invalid link type : miss stroke', () => {
            const config = new Config({
                ...Config.base,
                link_types: {
                    undefined: { color: '#000000' }
                }
            });
    
            assert.deepStrictEqual(
                config.report,
                ['link_types']
            );
        });
    
        it('should be return error into report array for invalid link type : miss color', () => {
            const config = new Config({
                ...Config.base,
                link_types: {
                    undefined: { stroke: 'invalid_stroke' }
                }
            });
    
            assert.deepStrictEqual(
                config.report,
                ['link_types']
            );
        });

        it('should be return error into report array for empty link type', () => {
            const config = new Config({
                ...Config.base,
                link_types: {
                    undefined: { stroke: 'simple', color: '#e1e1e1' },
                    '': { stroke: 'simple', color: '#e1e1e1' },
                }
            });
    
            assert.deepStrictEqual(
                config.report,
                ['link_types']
            );
        });
    });


    describe('type format', () => {
        const config = new Config({
            ...Config.base,
            record_types: {
                undefined: { fill: 'photo.jpg', stroke: 'black' },
                other: { fill: 'green', stroke: 'black' }
            }
        });

        it('should get image format from record fill', () => {
            assert.strictEqual(
                config.getFormatOfTypeRecord('undefined'),
                'image'
            );
        });
    
        it('should get color format from record fill', () => {
            assert.strictEqual(
                config.getFormatOfTypeRecord('other'),
                'color'
            );
        });
    });

    describe('views', () => {
        it('should be return error into report array for invalid views', () => {
            const config = new Config({
                ...Config.base,
                views: {
                    test: 'eyJyZWNvcmRJZCI6MjAyMjAxMfX0'
                }
            });
    
            assert.deepStrictEqual(
                config.report,
                ['views']
            );
        });

        it('should be return no error for valid views', () => {
            const viewJson = {
                recordId: 20220114171220,
                filters: ['idée'],
                focus: {
                    fromRecordId: 20220114171220,
                    level: 1
                }
            }

            const viewDecodeKey = JSON.stringify(viewJson);
            const viewEncodeKey = Buffer.from(viewDecodeKey, 'utf-8').toString('base64')

            const config = new Config({
                ...Config.base,
                views: {
                    test: viewEncodeKey
                }
            });
    
            assert.ok(config.isValid());
        });
    })

    describe('entities types', () => {
        it('should be keep all record types', () => {
            const config = new Config(fakeConfig.opts);

            assert.deepStrictEqual(
                fakeConfig.opts.record_types,
                config.opts.record_types
            );
        });

        it('should be keep all link types', () => {
            const config = new Config(fakeConfig.opts);
            assert.deepStrictEqual(
                fakeConfig.opts.link_types,
                config.opts.link_types
            );
        });
    });

    describe.only('node size', () => {
        it('should not be return error into report array for valid node size : unique', () => {
            const config = new Config({
                ...Config.base,
                node_size: {
                    method: 'unique',
                    value: 5
                }
            });
    
            assert.deepStrictEqual(
                config.report,
                []
            );
        });

        it('should not be return error into report array for valid node size : degree', () => {
            const config = new Config({
                ...Config.base,
                node_size: {
                    method: 'degree',
                    min: 5,
                    max: 10
                }
            });
    
            assert.deepStrictEqual(
                config.report,
                []
            );
        });

        it('should be return error into report array for invalid node size : miss value for unique method', () => {
            const config = new Config({
                ...Config.base,
                node_size: {
                    method: 'unique',
                    min: 5,
                    min: 10
                }
            });
    
            assert.deepStrictEqual(
                config.report,
                ['node_size']
            );
        });
    });
});
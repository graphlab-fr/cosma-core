const assert = require('assert');

const Config = require('../models/config')
    , { config: fakeOpts } = require('../utils/fake');

describe('Config verif', () => {
    it('should be return error into report array for invalid paths', () => {
        const config = new Config({
            ...Config.base,
            files_origin: '../no/exist/folder',
            export_target: '../no/exist/folder',
            csl: '../no/exist/folder',
            bibliography: '../no/exist/folder',
            csl_locale: '../no/exist/folder',
            css_custom: '../no/exist/folder'
        });

        assert.ok(
            JSON.stringify(config.report) === JSON.stringify(
                [
                    'files_origin',
                    'export_target',
                    'csl',
                    'bibliography',
                    'csl_locale',
                    'css_custom'
                ]
            )
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
            const config = new Config(fakeOpts);

            assert.deepStrictEqual(
                fakeOpts.record_types,
                config.opts.record_types
            );
        });

        it('should be keep all link types', () => {
            const config = new Config(fakeOpts);
            assert.deepStrictEqual(
                fakeOpts.link_types,
                config.opts.link_types
            );
        });
    })
});
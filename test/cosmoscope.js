const assert = require('assert')

const Cosmocope = require('../models/cosmoscope');

describe.only('Cosmoscope', () => {
    describe('data from Yaml FrontMatter', () => {
        describe('content', () => {
            it('should get string', () => {
                const result = Cosmocope.getDataFromYamlFrontMatter(
`---
title: simple
---

toto et tata`,
                    'path'
                )
                assert.strictEqual(
                    result.content,
                    '\n\ntoto et tata'
                )
            });
        })

        describe('title', () => {
            it('should get string', () => {
                const result = Cosmocope.getDataFromYamlFrontMatter(
`---
title: simple
---`,
                    'path'
                )
                assert.strictEqual(
                    result.metas.title,
                    'simple'
                )
            });

            it('should stringify date as YYYY-MM-DD', () => {
                const result = Cosmocope.getDataFromYamlFrontMatter(
`---
title: 2001-01-01
---`,
                    'path'
                )
                assert.strictEqual(
                    result.metas.title,
                    '2001-01-01'
                )
            });

            it('should stringify null', () => {
                const result = Cosmocope.getDataFromYamlFrontMatter(
`---
title: null
---`,
                    'path'
                )
                assert.strictEqual(
                    result.metas.title,
                    'null'
                )
            });

            it('should stringify boolean', () => {
                const result = Cosmocope.getDataFromYamlFrontMatter(
`---
title: true
---`,
                    'path'
                )
                assert.strictEqual(
                    result.metas.title,
                    'true'
                )
            });

            it('should stringify array', () => {
                const result = Cosmocope.getDataFromYamlFrontMatter(
`---
title: ['title', 'as', 'array']
---`,
                    'path'
                )
                assert.strictEqual(
                    result.metas.title,
                    'title,as,array'
                )
            });
        })

        describe('type', () => {
            it('should keep array', () => {
                const result = Cosmocope.getDataFromYamlFrontMatter(
`---
type: ['toto', 'tata']
---`,
                    'path'
                )
                assert.deepStrictEqual(
                    result.metas.type,
                    ['toto', 'tata']
                )
            });

            it('should get array from string', () => {
                const result = Cosmocope.getDataFromYamlFrontMatter(
`---
type: toto
---`,
                    'path'
                )
                assert.deepStrictEqual(
                    result.metas.type,
                    ['toto']
                )
            });

            it('should get array contains "undefined" from empty string', () => {
                const result = Cosmocope.getDataFromYamlFrontMatter(
`---
type: 
---`,
                    'path'
                )
                assert.deepStrictEqual(
                    result.metas.type,
                    ['undefined']
                )
            });

            it('should get array contains "undefined" from empty array', () => {
                const result = Cosmocope.getDataFromYamlFrontMatter(
`---
type: []
---`,
                    'path'
                )
                assert.deepStrictEqual(
                    result.metas.type,
                    ['undefined']
                )
            });
        })

        describe('tags', () => {
            it('should keep string', () => {
                const result = Cosmocope.getDataFromYamlFrontMatter(
`---
tags: toto
---`,
                    'path'
                )
                assert.strictEqual(
                    result.metas.tags,
                    'toto'
                )
            });

            it('should keep array', () => {
                const result = Cosmocope.getDataFromYamlFrontMatter(
`---
tags: ['toto', 'tata']
---`,
                    'path'
                )
                assert.deepStrictEqual(
                    result.metas.tags,
                    ['toto', 'tata']
                )
            });

            it('should keep "keywords" key value', () => {
                const result = Cosmocope.getDataFromYamlFrontMatter(
`---
keywords: ['toto', 'tata']
---`,
                    'path'
                )
                assert.deepStrictEqual(
                    result.metas.tags,
                    ['toto', 'tata']
                )
            });
        })
    })
})
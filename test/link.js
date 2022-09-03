const assert = require('assert')
    , should = require('chai').should();

const Link = require('../models/link')

describe('Link', () => {
    describe('csv read', () => {
        it('should throw error for empty source or target', () => {
            assert.throws(() => Link.getFormatedDataFromCsvLine({ source: '' }));
            assert.throws(() => Link.getFormatedDataFromCsvLine({ target: '' }));
        });

        it('should throw error for NaN source or target', () => {
            assert.throws(() => Link.getFormatedDataFromCsvLine({ source: 'NaN', target: NaN }));
        });

        it('should return a valid Link format', () => {
            assert.deepEqual(
                Link.getFormatedDataFromCsvLine({ source: 1, target: '2', label: 'Lorem...' }),
                { source: 1, target: 2, label: 'Lorem...' }
            );
        });
    })
})
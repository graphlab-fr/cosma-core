const assert = require('assert')
    , should = require('chai').should();

const { fetchFileText } = require('../utils/misc')
    , { bib } = require('../utils/fake');

const Bibliography = require('../models/bibliography');

let bibliography;

before(() => {
    return new Promise((resolve) => {
        Promise.all([
            fetchFileText('https://www.zotero.org/styles/iso690-author-date-fr-no-abstract'),
            fetchFileText('https://raw.githubusercontent.com/citation-style-language/locales/6b0cb4689127a69852f48608b6d1a879900f418b/locales-fr-FR.xml')
        ])
        .then(([cslStyleFileContent, xmlLocalFileContent]) => {
            bibliography = new Bibliography(
                bib,
                cslStyleFileContent,
                xmlLocalFileContent
            );
            resolve();
        })
    });
});

describe('Bibliography', () => {
    it('should extract bibliographic records from text', () => {
        const text = "Lorem ipsum [@Goody_1979, 12] dolor est [@Akrich_2016 ; @Chun_2008, 24]";
        const bibliographicRecords = Bibliography.getBibliographicRecordsFromText(text);
        bibliographicRecords.should.have.length(2);

        const [recordGoody, recordAkrichChun] = bibliographicRecords;
        const { record, cluster } = bibliography.get(recordGoody);
        cluster.should.to.include('Goody').and.include('12');
        record.should.to.include('La Raison graphique: la domestication de la pensée sauvage');
    });

    it('should extract bibliographic records from list', () => {
        const list = ['Goody_1979', 'Chun_2008'];
        const bibliographicRecords = Bibliography.getBibliographicRecordsFromList(list);

        const [recordGoody, recordChun] = bibliographicRecords;
        const { record, cluster } = bibliography.get(recordChun);
        cluster.should.to.include('Chun');
        record.should.to.include('Code as Fetish');
    });

    it('should extract ignore unknowned authors records from text', () => {
        const text = "Lorem ipsum [@Out_library_author, 1 ; @Goody_1979] dolor est";
        const bibliographicRecords = Bibliography.getBibliographicRecordsFromText(text);

        const [recordUnknownedGoody] = bibliographicRecords;
        const { record, cluster } = bibliography.get(recordUnknownedGoody);
        cluster.should.to.include('Goody');
        record.should.to.include('La Raison graphique: la domestication de la pensée sauvage');
    });
})
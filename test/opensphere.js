const assert = require('assert')
    , should = require('chai').should();

const { parse } = require("csv-parse/sync");

const Opensphere = require('../models/opensphere');

const csvNodes =
`title,id,type:nature,type:relation,meta:titre,tag:genre,time:begin,time:end,image,quote
Paul Otlet,1,Personne,otlet,Fondateur du Mundaneum,Homme,1868,1944,OtletPaul.png,perret2016
Suzanne Briet,2,Personne,non-catégorisé,« Madame documentation »,Femme,1894,1989,BrietSuzanne.png,ledeuff2016
Melvil Dewey,3,Personne,non-catégorisé,Bibliothécaire auteur de la Classification décimale,Homme,1851,1931,DeweyMelvil.png,perret2016
Emanuel Goldberg,4,Personne,non-catégorisé,Inventeur du sélecteur rapide de microfilm,Homme,1881,1970,GoldbergEmanuel.png,ledeuff2007`;
const csvLinks =
`id,source,target,title
1,1,2,Ils ont écris ensemble
2,1,3,Ils ont travaillé ensemble
3,2,4,Ils se sont rencontrés
4,3,2,Ils se connaissent depuis 1 an
5,4,3,Ils ont dîner ensemble`;

describe.only('Opensphere', () => {
    const linksData = parse(csvLinks, { columns: true, skip_empty_lines: true });
    const links = Opensphere.formatArrayLinks(linksData);
    const recordsData = parse(csvNodes, { columns: true, skip_empty_lines: true });
    const records = Opensphere.formatArrayRecords(recordsData, links);

    describe('Get links from data', () => {
        it('should format title', () => {
            const { context: contextFromData } = links[2];
            const { title: titleFromModele } = linksData[2];
            titleFromModele.should.to.equal(contextFromData);
        });
    })

    describe('Get records from data', () => {
        it('should format type', () => {
            const typeFromData = [
                recordsData[2]['type:nature'],
                recordsData[2]['type:relation']
            ];
            const typeFromModele = records[2].type;
            typeFromModele.should.to.deep.equal(typeFromData)
        });

        it('should format metas', () => {
            const label = 'titre';
            const metaFromData = recordsData[2][`meta:${label}`];
            const metaFromModele = records[2].metas;
            metaFromModele.should.to.deep.equal({ [label]: metaFromData })
        });
    });
})
const fs = require('fs/promises'),
  path = require('path');

const { read: readYmlFm } = require('../utils/yamlfrontmatter');

const { expect } = require('chai');
const assert = require('assert');

describe('YAML Front Matter parser', () => {
  it('should find all properties from YAML file head', async () => {
    const file = await fs.readFile(path.join(__dirname, './fixture', 'Paul Otlet.md'), 'utf-8');
    const { head } = readYmlFm(file);

    assert.deepEqual(head, {
      title: 'Paul Otlet',
      id: 20210901132906,
      type: 'Personne',
      subtitle: 'Fondateur du Mundaneum et juriste',
      keywords: ['CDU'],
    });
  });

  it('should separate markdown content from YAML head', async () => {
    const file = await fs.readFile(path.join(__dirname, './fixture', 'Paul Otlet.md'), 'utf-8');
    const { content } = readYmlFm(file);

    expect(content).contain('\n\nPaul Otlet est la tête pensante du Mundaneum');
    expect(content).contain("personnalités et d'institutions qui l'entourent.\n");
  });

  it('should get undefined content and empty object for empty file content', () => {
    const { head, content } = readYmlFm('');

    assert.deepEqual(head, {});
    expect(content).to.be.undefined;
  });
});

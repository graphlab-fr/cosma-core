const fs = require('fs')
    , path = require('path');

const assert = require('assert')
    , puppeteer = require('puppeteer');

const Graph = require('../models/graph');

const { cosmocope } = require('../utils/generate');

describe('App', async () => {
    let /** @type {puppeteer.Browser} */ browser
        , /** @type {puppeteer.Page} */ page
        , /** @type {Graph} */ graphModelInExport;

    const tempFolderPath = path.join(__dirname, '../temp');
    const testComoscopePath = path.join(tempFolderPath, 'cosmoscope.html');

    before('launch Puppeteer', () => {
        return new Promise(async (resolve) => {
            const { graph } = await cosmocope(tempFolderPath);
            graphModelInExport = graph;
            browser = await puppeteer.launch({
                headless: true,
                devtools: true
            });
            resolve();
        })
    });

    beforeEach('open Puppeteer page', () => {
        return new Promise(async (resolve) => {
            page = await browser.newPage();
            await page.goto(
                'file://' + testComoscopePath,
                { timeout: 0, waitUntil: 'domcontentloaded' }
            );
            resolve();
        });
    });
    
    afterEach('close Puppeteer page', () => {
        return new Promise(async (resolve) => {
            await page.close();
            resolve();
        });
    });

    after('close Puppeteer', () => {
        return new Promise(async (resolve) => {
            await browser.close();
            resolve();
        });
    });

    describe('zoom', async () => {
        it('should increase svg container scale on zoom in and decrease svg container scale on zoom out', async () => {
            await page.click('button[onclick="zoomMore()"]');
            const zoomInResult = await page.evaluate(() => {
                const graphCanvas = document.querySelector('#graph-canvas');
                const graphCanvasStyle = graphCanvas.getAttribute('style');
                const [_, scaleAfterClick] = graphCanvasStyle.match(/scale\((.*)\)/);
                return scaleAfterClick;
            });
            assert.ok(zoomInResult > 1);
        });
    });

    describe('search', async () => {
        const { records } = graphModelInExport;
        it('should a records list with title and type on input', async () => {
            const isOk = await page.evaluate((record) => {
                const input = document.getElementById('search');
                const outputList = document.getElementById('search-result-list');
                input.value = record.title;
                const focusEvent = new Event('focus');
                input.dispatchEvent(focusEvent);
                const inputEvent = new Event('input');
                input.dispatchEvent(inputEvent);
                const { childNodes: outputLines } = outputList;
                if (outputLines.length <= 0) {
                    return false;
                }
                const firstOutputLine = outputLines[0];
                if (firstOutputLine.classList.contains('outline') === false) {
                    return false;
                }
                const firstOutputLineSpans = firstOutputLine.querySelectorAll('span');
                const [typeSpan, titleSpan] = firstOutputLineSpans;
                if (titleSpan.textContent !== record.title) {
                    return false;
                }
                if (typeSpan.getAttribute('style').indexOf(record.type) !== 14) {
                    // exemple in 'color:var(--n_task)', types as 'task' are at 14th character
                    return false;
                }
                return true;
            }, records[0]);
            assert.ok(isOk);
        });
    });
})
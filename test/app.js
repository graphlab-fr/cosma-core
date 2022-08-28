const fs = require('fs')
    , path = require('path');

const assert = require('assert')
    , puppeteer = require('puppeteer');

const { cosmocope } = require('../utils/generate');

let browser, page;
const tempFolderPath = path.join(__dirname, '../temp');
const testComoscopePath = path.join(tempFolderPath, 'cosmoscope.html');

before(async () => {
    return new Promise(async (resolve) => {
        if (fs.existsSync(tempFolderPath) === false) {
            fs.mkdirSync(tempFolderPath);
        }
        await cosmocope(tempFolderPath);
        resolve();
    })
});

describe('App', async () => {
    beforeEach(async () => {
        return new Promise(async (resolve) => {
            browser = await puppeteer.launch({
                headless: true,
                devtools: true
            });
            page = await browser.newPage();
            await page.goto(
                'file://' + testComoscopePath,
                { timeout: 0, waitUntil: 'domcontentloaded' }
            );
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
            await browser.close();
            assert.ok(zoomInResult > 1);
        });
    });
})
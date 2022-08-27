const assert = require('assert')
    , path = require('path')
    , puppeteer = require('puppeteer');

let browser, page;

describe('App', async () => {

    beforeEach(async () => {
        return new Promise(async (resolve) => {
            browser = await puppeteer.launch({
                headless: false,
                devtools: true
            });
            page = await browser.newPage();
            await page.goto(
                'file://' + path.join(__dirname, '../cosmoscope.html'),
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
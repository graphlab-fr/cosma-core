const assert = require('assert')
    , path = require('path')
    , puppeteer = require('puppeteer');

require('../index'); // generate the App

describe('App', async () => {
    let browser, page;

    it('should open', async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        const response = await page.goto(
            'file://' + path.join(__dirname, '../cosmoscope.html'),
            { timeout: 0, waitUntil: 'domcontentloaded' }
        );
        assert.strictEqual(response.status(), 200);
    });

    let scale = 1;

    describe('zoom in', async () => {
        it('should increase svg container scale', async () => {
            let scaleAfterClick;
            await page.click('button[onclick="zoomMore()"]');
            scaleAfterClick = await page.evaluate(() => document.querySelector('#graph-canvas').getAttribute('style'));
            scaleAfterClick = scaleAfterClick.match(/scale\((.*)\)/)[1];
            scaleAfterClick = Number(scaleAfterClick);
            assert.ok(scaleAfterClick > scale)
        });
    });

    describe('zoom out', async () => {
        it('should decrease svg container scale', async () => {
            let scaleAfterClick;
            await page.click('button[onclick="zoomLess()"]');
            scaleAfterClick = await page.evaluate(() => document.querySelector('#graph-canvas').getAttribute('style'));
            scaleAfterClick = scaleAfterClick.match(/scale\((.*)\)/)[1];
            scaleAfterClick = Number(scaleAfterClick);
            assert.ok(scaleAfterClick === scale)
        });
    });

    describe('zoom reset', async () => {
        it('should reset svg container scale', async () => {
            let scaleAfterClick;
            await page.click('button[onclick="zoomReset()"]');
            scaleAfterClick = await page.evaluate(() => document.querySelector('#graph-canvas').getAttribute('style'));
            scaleAfterClick = scaleAfterClick.match(/scale\((.*)\)/)[1];
            scaleAfterClick = Number(scaleAfterClick);
            assert.ok(scaleAfterClick === 1)
        });
    });

    describe('open record', async () => {
        it('should open record panel', async () => {
            let id, isActive;
            id = await page.evaluate(() => document.querySelector('.menu-index-list > li').dataset.index);
            await page.evaluate(id => openRecord(id), id);
            isActive = await page.evaluate((id) => document.getElementById(id).classList.contains('active'), id);
            assert.ok(isActive);
        });
    });

    describe('filter', async () => {
        it('should hide list of nodes', async () => {
            let ids, result = [];
            ids = await page.evaluate(() => document.querySelector('[data-filter]').dataset.filter);
            ids = ids.split(',')
            page.click('[data-filter]')
            await page.waitForTimeout(1000);
            for (const id of ids) {
                const isHidden = await page.evaluate(
                    (id) => document.querySelector('[data-node="' + id + '"]').getAttribute('style') === 'display: none;'
                    , id
                )
                result.push(isHidden);
            }
            assert.ok(result.every(e => e === true));
        });
    });

    await browser.close();
})
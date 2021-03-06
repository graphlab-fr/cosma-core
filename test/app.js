const assert = require('assert')
    , path = require('path')
    , puppeteer = require('puppeteer');

describe('App', async () => {
    let browser, page;

    it('should open', async () => {
        browser = await puppeteer.launch({
            headless: false,
            devtools: true
        });
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

    describe('record footer links', async () => {
        // it('should links context only highlight the id fo the targeted record', async () => {
            
        // });

        it('should backlinks context only highlight the id fo the current record', async () => {
            const result = await page.evaluate(() => {
                const allRecordsContainer = document.querySelectorAll('.record')

                let i = 0, recordContainer = allRecordsContainer[i];
                while (recordContainer.querySelector('.record-backlinks-list') === null) {
                    // find the first record container with backlinks
                    recordContainer = allRecordsContainer[i];
                    i++;
                }

                const id = recordContainer.id;

                const firstBacklinkContext = recordContainer
                    .querySelector('.record-backlinks-list')
                    .querySelector('.record-links-context')

                const foreignIdsMarkup = firstBacklinkContext.querySelectorAll('[data-target-id]');

                const ids = new Set(
                    Array.from(foreignIdsMarkup).map(elt => elt.dataset.targetId)
                );

                return ids.has(id) && ids.size === 1;
            });
            assert.ok(result);
        });
    });

    await browser.close();
})
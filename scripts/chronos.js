const chronosForm = document.getElementById('chronos-form');

(() => {
    const chronosRange = chronosForm.querySelector('[name="chronos_range"]')

    /**
     * @param {boolean} isActive 
     */
    window.toogleChronos = function(isActive) {
        if (isActive) {
            chronosForm.classList.add('active');
            chronosAction(chronosRange.valueAsNumber);
        } else {
            chronosForm.classList.remove('active');
            displayNodes(data.nodes.map(({ id }) => id));
        }
    }
})();

(() => {
    const chronosTicksContainer = document.getElementById('chronos-ticks');

    function setChronosTicks() {
        const tickNb = Math.round(chronosForm.offsetWidth / 100);
        const step = Math.round((chronos.end - chronos.begin) / tickNb);

        chronosTicksContainer.setAttribute('style', `--list-length: ${tickNb + 1};`)
        chronosTicksContainer.innerHTML = '';

        chronosTicksContainer.insertAdjacentHTML(
            'beforeend',
            `<option value="${chronos.begin}">${getDateFromTimesetamp(chronos.begin)}</option>`
        );
        for (let i = 1; i <= tickNb; i++) {
            if (i === tickNb) {
                chronosTicksContainer.insertAdjacentHTML(
                    'beforeend',
                    `<option value="${chronos.end}">${getDateFromTimesetamp(chronos.end)}</option>`
                );
                continue;
            }

            chronosTicksContainer.insertAdjacentHTML(
                'beforeend',
                `<option value="${chronos.begin + step * i}">${getDateFromTimesetamp(chronos.begin + step * i)}</option>`
            );
        }
    }

    setChronosTicks();
    window.addEventListener('resize', setChronosTicks);

    function getDateFromTimesetamp(timestamp) {
        return new Date(timestamp * 1000).toLocaleDateString(graphProperties.lang)
    }
})();

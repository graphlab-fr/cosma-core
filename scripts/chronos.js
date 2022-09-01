(() => {
    const chronosForm = document.getElementById('chronos-form');
    const chronosRange = chronosForm.querySelector('[name="chronos_range"]')

    /**
     * @param {boolean} isActive 
     */
    window.toogleChronos = function(isActive) {
        if (isActive) {
            chronosForm.removeAttribute('hidden');
            chronosAction(chronosRange.valueAsNumber);
        } else {
            displayNodes(data.nodes.map(({ id }) => id));
            chronosForm.setAttribute('hidden', true);
        }
    }
})();
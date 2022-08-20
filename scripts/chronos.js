function toogleChronos(bool) {
    const input = document.getElementById('chronos-range');
    if (bool === true) {
        input.removeAttribute('hidden');
    } else {
        displayNodes(data.nodes.map(({ id }) => id));
        input.setAttribute('hidden', true);
    }
}
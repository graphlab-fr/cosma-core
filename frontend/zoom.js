import * as d3 from "d3";

import View from './view';
import { svg } from './graph';

const zoomInterval = 0.3 // interval between two (de)zoom
    , zoomMax = 3
    , zoomMin = 1;

svg.call(d3.zoom().on('zoom', function () {
    if (d3.event.sourceEvent === null) {
        zoomMore();
        return;
    }

    switch (d3.event.sourceEvent.type) {
        case 'wheel':
            if (d3.event.sourceEvent.deltaY >= 0) {
                zoomLess();
            } else {
                zoomMore();
            }
            break;

        case 'mousemove': // by drag and move with mouse
            View.position.x += d3.event.sourceEvent.movementX;
            View.position.y += d3.event.sourceEvent.movementY;
            translate();
            break;
    }
}));

function zoomMore() {
    View.position.zoom += zoomInterval;
    if (View.position.zoom >= zoomMax) {
        View.position.zoom = zoomMax;
    }
    translate();
}

function zoomLess() {
    View.position.zoom -= zoomInterval;
    if (View.position.zoom <= zoomMin) {
        View.position.zoom = zoomMin;
    }
    translate();
}

function zoomReset() {
    View.position.zoom = 1;
    View.position.x = 0;
    View.position.y = 0;
    translate();
}

window.zoomMore = zoomMore;
window.zoomLess = zoomLess;
window.zoomReset = zoomReset;

hotkeys('r', (e) => {
    e.preventDefault();
    zoomReset();
});

function translate() {
    const { x, y, zoom } = View.position;
    svg.attr('style', `transform:translate(${x}px, ${y}px) scale(${zoom});`);
}
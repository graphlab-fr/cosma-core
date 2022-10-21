import * as d3 from "d3";

import View from './view';
import { svg, svgSub } from './graph';

let { width, height } = svg.node().getBoundingClientRect();

const zoomInterval = 0.3 // interval between two (de)zoom
    , zoomMax = 10
    , zoomMin = 0;

const zoom = d3.zoom()
    // .scaleExtent([1 / 2, 4])
    .on("zoom", () => {
        const { x, y, k } = d3.event.transform;
        View.position.x = x || 0;
        View.position.y = y || 0;
        View.position.zoom = k || 1;
        translate();
    });

svg.call(zoom);

function zoomMore() {
    View.position.zoom += zoomInterval;
    if (View.position.zoom >= zoomMax) {
        View.position.zoom = zoomMax;
    }
    svg.call(
        zoom.transform,
        d3.zoomIdentity
            .translate(View.position.y, View.position.x)
            .scale(View.position.zoom)
    );
    translate();
}

function zoomLess() {
    View.position.zoom -= zoomInterval;
    if (View.position.zoom <= zoomMin) {
        View.position.zoom = zoomMin;
    }
    svg.call(
        zoom.transform,
        d3.zoomIdentity
            .translate(View.position.y, View.position.x)
            .scale(View.position.zoom)
    );
    translate();
}

function zoomReset() {
    View.position.zoom = 1;
    View.position.x = 0;
    View.position.y = 0;
    svg.call(
        zoom.transform,
        d3.zoomIdentity
            .translate(View.position.y, View.position.x)
            .scale(View.position.zoom)
    );
    translate();
}

window.zoomMore = zoomMore;
window.zoomLess = zoomLess;
window.zoomReset = zoomReset;

function translate() {
    const { x, y, zoom } = View.position;
    const viewBox = [-x, -y, width / zoom, height / zoom].join(' ');
    svgSub.attr('viewBox', viewBox);
}
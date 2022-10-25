import * as d3 from "d3";

import View from './view';
import {
    hideFromIndex,
    displayFromIndex,
    recordContainer
} from './records';
import { setCounters } from './counter';


/** Data serialization
------------------------------------------------------------*/

data.nodes = data.nodes.map(function (node) {
    node.hidden = false;
    node.isolated = false;
    node.highlighted = false;
    return node;
});

/** Box sizing
------------------------------------------------------------*/

const svg = d3.select("#graph-canvas");
const svgSub = svg.append("svg");

const { width, height } = svg.node().getBoundingClientRect();

svgSub
    .attr("viewBox", [0, 0, width, height])
    .attr("preserveAspectRatio", "xMinYMin meet");

/** Force simulation
------------------------------------------------------------*/

const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter())
    .force("forceX", d3.forceX())
    .force("forceY", d3.forceY());

simulation.force("center")
    .x(width * 0.5)
    .y(height * 0.5);

window.updateForces = function () {
    // get each force by name and update the properties

    simulation.force("charge")
        // turn force value to negative number
        .strength(-Math.abs(graphProperties.attraction_force))
        .distanceMax(graphProperties.attraction_distance_max);

    simulation.force("forceX")
        .strength(graphProperties.attraction_vertical)

    simulation.force("forceY")
        .strength(graphProperties.attraction_horizontal)

    // restarts the simulation
    simulation.alpha(1).restart();
}

updateForces();

simulation
    .on("tick", function () {
        elts.links
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        elts.nodes
            .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");

        d3.select('#load-bar-value')
            .style('flex-basis', (simulation.alpha() * 100) + '%');
    });

/** Elements
------------------------------------------------------------*/

const elts = {};

elts.links = svgSub.append("g")
    .selectAll("line")
    .data(data.links)
    .enter().append("line")
    .attr("stroke", (d) => d.color)
    .attr("title", (d) => d.title)
    .attr("data-source", (d) => d.source.id)
    .attr("data-target", (d) => d.target.id)
    .attr("stroke-dasharray", function (d) {
        if (d.shape.stroke === 'dash' || d.shape.stroke === 'dotted') {
            return d.shape.dashInterval
        }
        return false;
    })
    .attr("filter", function (d) {
        if (d.shape.stroke === 'double') {
            return 'url(#double)'
        }
        return false;
    });

if (graphProperties.graph_arrows === true) {
    elts.links
        .attr("marker-end", 'url(#arrow)');
}

elts.nodes = svgSub.append("g")
    .selectAll("g")
    .data(data.nodes)
    .enter().append("g")
    .attr("data-node", (d) => d.id)
    .on('click', function (d) {
        openRecord(d.id);
    });

elts.circles = elts.nodes.append("circle")
    .attr("r", (d) => d.size)
    .attr("fill", (d) => d.fill)
    .attr("stroke", (d) => d.colorStroke)
    .attr("stroke-width", (d) => d.strokeWidth)
    .call(d3.drag()
        .on("start", function (d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        })
        .on("drag", function (d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        })
        .on("end", function (d) {
            if (!d3.event.active) simulation.alphaTarget(0.0001);
            d.fx = null;
            d.fy = null;
        })
    )
    .on('mouseenter', function (nodeMetas) {
        if (!graphProperties.graph_highlight_on_hover) { return; }

        let nodesIdsHovered = [nodeMetas.id];

        const linksToModif = elts.links.filter(function (link) {
            if (link.source.id === nodeMetas.id || link.target.id === nodeMetas.id) {
                nodesIdsHovered.push(link.source.id, link.target.id);
                return false;
            }
            return true;
        })

        const nodesToModif = elts.nodes.filter(function (node) {
            if (nodesIdsHovered.includes(node.id)) {
                return false;
            }
            return true;
        })

        const linksHovered = elts.links.filter(function (link) {
            if (link.source.id !== nodeMetas.id && link.target.id !== nodeMetas.id) {
                return false;
            }
            return true;
        })

        const nodesHovered = elts.nodes.filter(function (node) {
            if (!nodesIdsHovered.includes(node.id)) {
                return false;
            }
            return true;
        })

        nodesHovered.selectAll("circle").attr('stroke', d => d.highlight);
        linksHovered.attr('stroke', d => d.colorHighlight);
        nodesToModif.attr('opacity', 0.5);
        linksToModif.attr('stroke-opacity', 0.5);
    })
    .on('mouseout', function () {
        if (!graphProperties.graph_highlight_on_hover) { return; }

        elts.nodes.selectAll("circle").attr('stroke', d => d.colorStroke);
        elts.links.attr('stroke', d => d.color);
        elts.nodes.attr('opacity', 1);
        elts.links.attr('stroke-opacity', 1);
    });

elts.labels = elts.nodes.append("text")
    .each(function (d) {
        const words = d.label.split(' ')
            , max = 25
            , text = d3.select(this);
        let label = '';

        for (let i = 0; i < words.length; i++) {
            // combine words and seperate them by a space caracter into label
            label += words[i] + ' ';

            // if label (words combination) is longer than max & not the single iteration
            if (label.length < max && i !== words.length - 1) { continue; }

            text.append("tspan")
                .attr('x', 0)
                .attr('dy', '1.2em')
                .text(label.slice(0, -1)); // remove last space caracter

            label = '';
        }
    })
    .attr('font-size', graphProperties.graph_text_size)
    .attr('x', 0)
    .attr('y', (d) => d.size)
    .attr('dominant-baseline', 'middle')
    .attr('text-anchor', 'middle');

/** Functions
------------------------------------------------------------*/

/**
* Get nodes and their links
* @param {array} nodeIds - List of nodes ids
* @returns {array} - DOM elts : nodes and their links
*/

function getNodeNetwork(nodeIds) {
    const diplayedNodes = elts.nodes
        .filter(item => item.hidden === false)
        .data()
        .map(item => item.id);

    const nodes = elts.nodes.filter(node => nodeIds.includes(node.id));

    const links = elts.links.filter(function (link) {
        if (!nodeIds.includes(link.source.id) && !nodeIds.includes(link.target.id)) {
            return false;
        }
        if (!diplayedNodes.includes(link.source.id) || !diplayedNodes.includes(link.target.id)) {
            return false;
        }

        return true;
    });

    return {
        nodes: nodes,
        links: links
    }
}

/**
* Hide some nodes & their links, by their id
* @param {array} nodeIds - List of nodes ids
*/

function hideNodes (nodeIds) {
    let nodesToHideIds;

    nodesToHideIds = data.nodes.filter(function (item) {
        if (nodeIds.includes(item.id) && item.hidden === false) {
            return true;
        }
    });

    if (View.focusMode) {
        nodesToHideIds = nodesToHideIds.filter(function (item) {
            if (item.isolated === true) {
                return true;
            }
        })
    }

    nodesToHideIds = nodesToHideIds
        .map(node => node.id);

    hideNodeNetwork(nodesToHideIds);
    hideFromIndex(nodesToHideIds);

    elts.nodes.data(
        elts.nodes
            .data()
            .map(function (node) {
                if (nodesToHideIds.includes(node.id)) {
                    node.hidden = true;
                }

                return node;
            })
    );
}

/**
* Display some nodes & their links, by their id
* @param {array} nodeIds - List of nodes ids
*/

function displayNodes (nodeIds) {
    let nodesToDisplayIds;

    nodesToDisplayIds = data.nodes.filter(function (item) {
        if (nodeIds.includes(item.id) && item.hidden === true) {
            return true;
        }
    });

    if (View.focusMode) {
        nodesToDisplayIds = nodesToDisplayIds.filter(function (item) {
            if (item.isolated === true) {
                return true;
            }
        })
    }

    nodesToDisplayIds = nodesToDisplayIds
        .map(node => node.id);

    elts.nodes.data(
        elts.nodes
            .data()
            .map(function (node) {
                if (nodesToDisplayIds.includes(node.id)) {
                    node.hidden = false;
                }

                return node;
            })
    );

    displayNodeNetwork(nodesToDisplayIds);
    displayFromIndex(nodesToDisplayIds);
}

/**
* Zoom to a node from its coordinates
* @param {number} nodeId
*/

window.zoomToNode = function (nodeId) {
    const nodeToZoomMetas = elts.nodes.filter(node => node.id === nodeId).datum()
        , zoom = 2
        , recordWidth = recordContainer.offsetWidth;

    let x = nodeToZoomMetas.x
        , y = nodeToZoomMetas.y

    // coordonates to put the node at the graph top-left corner
    x = width / 2 - zoom * x;
    y = height / 2 - zoom * y;

    // add px to put the node to the graph center
    x += (window.innerWidth - recordWidth) / 2;
    y += window.innerHeight / 2;

    View.position = {
        zoom: zoom,
        x: x,
        y: y
    };

    translate();
}

/**
* Display none nodes and their link
* @param {array} nodeIds - List of nodes ids
*/

window.hideNodeNetwork = function (nodeIds) {
    const ntw = getNodeNetwork(nodeIds);

    ntw.nodes.style('display', 'none');
    ntw.links.style('display', 'none');
}

/**
* Reset display nodes and their link
* @param {array} nodeIds - List of nodes ids
*/

window.displayNodeNetwork = function (nodeIds) {
    const ntw = getNodeNetwork(nodeIds);

    ntw.nodes.style('display', null);
    ntw.links.style('display', null);
}

/**
* Apply highlightColor (from config) to somes nodes and their links
* @param {array} nodeIds - List of nodes ids
*/

function highlightNodes (nodeIds) {
    const ntw = getNodeNetwork(nodeIds);

    ntw.nodes.selectAll("circle").style('stroke', 'var(--highlight)');
    ntw.links.style('stroke', 'var(--highlight)');

    View.highlightedNodes = View.highlightedNodes.concat(nodeIds);
}

/**
* remove highlightColor from all highlighted nodes and their links
*/

function unlightNodes () {
    if (View.highlightedNodes.length === 0) { return; }

    const ntw = getNodeNetwork(View.highlightedNodes);

    ntw.nodes.selectAll("circle").style('stroke', null);
    ntw.links.style('stroke', null);

    View.highlightedNodes = [];
}

/**
* Toggle display/hide nodes links
* @param {bool} isChecked - 'checked' value send by a checkbox input
*/

window.linksDisplayToggle = function (isChecked) {
    if (isChecked) {
        elts.links.style('display', null);
    } else {
        elts.links.style('display', 'none');
    }
}

/**
* Toggle display/hide nodes label
* @param {bool} isChecked - 'checked' value send by a checkbox input
*/

window.labelDisplayToggle = function (isChecked) {
    if (isChecked) {
        elts.labels.style('display', null);
    } else {
        elts.labels.style('display', 'none');
    }
}

/**
* Add 'highlight' class to texts linked to nodes ids
* @param {array} nodeIds - List of node ids
*/

window.labelHighlight = function (nodeIds) {
    const labelsToHighlight = elts.nodes
        .filter(node => nodeIds.includes(node.id)).select('text');

    data.nodes = data.nodes.map(function (node) {
        if (nodeIds.includes(node.id)) {
            node.highlighted = true;
        }
        return node;
    });

    labelsToHighlight.style('fill', 'var(--highlight)');
}

/**
* Change the font size of graph labels
*/

window.updateFontsize = function () {
    elts.labels.attr('font-size', graphProperties.text_size);
}

/**
* Remove 'highlight' class from texts linked to nodes ids
* @param {array} nodeIds - List of node ids
*/

window.labelUnlight = function (nodeIds) {
    const labelsToHighlight = elts.nodes
        .filter(node => nodeIds.includes(node.id)).select('text');

    data.nodes = data.nodes.map(function (node) {
        if (nodeIds.includes(node.id)) {
            node.highlighted = false;
        }
        return node;
    });

    labelsToHighlight.style('fill', null);
}

/**
* Remove 'highlight' class from all texts
*/

window.labelUnlightAll = function () {
    data.nodes = data.nodes.map(function (node) {
        node.highlighted = false;
        return node;
    });

    elts.labels.style('fill', null);
}

/**
* @param {number} timestamp
*/

window.chronosAction = function (timestamp) {
    if (chronos.begin === undefined || chronos.end === undefined) {
        return;
    }

    const toHide = [], toDisplay = [];

    for (const node of data.nodes) {
        if (node.end === undefined) { node.end = chronos.end }
        if (node.begin === undefined) { node.begin = chronos.begin }

        if (timestamp >= node.begin && timestamp <= node.end) {
            toDisplay.push(node.id);
        } else {
            toHide.push(node.id);
        }
    }

    hideNodes(toHide);
    displayNodes(toDisplay);
    setCounters();
}

function translate() {
    const { x, y, zoom } = View.position;
    svg.attr('style', `transform:translate(${x}px, ${y}px) scale(${zoom});`);
}

export { svg, svgSub, hideNodes, displayNodes, highlightNodes, unlightNodes };
import GraphEngine from "graphology";
import { bfsFromNode as neighborsExtend } from 'graphology-traversal/bfs';
import hotkeys from "hotkeys-js";
import { displayNodes, hideNodesAll, displayNodesAll } from "./graph";
import View from "./view";

window.focusMode = 'inbound';

window.addEventListener("DOMContentLoaded", () => {
    /** @type {HTMLInputElement} */
    const checkbox = document.getElementById('focus-check');
    /** @type {HTMLInputElement} */
    const input = document.getElementById('focus-input');

    if (!checkbox && !input) { return; }
    
    checkbox.checked = false;

    let graph;

    hotkeys('f', (e) => {
        e.preventDefault();
        checkbox.checked = true;
        active();
    });

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            active();
        } else {
            input.classList.remove('active');
            input.removeEventListener('input', action);
            displayNodesAll();
        }
    });

    function active() {
        if (View.openedRecordId === undefined) {
            checkbox.checked = false;
            return;
        }

        if (graph === undefined) {
            graph = getGraphEngine();
        }

        action();
        input.classList.add('active');
        input.addEventListener('input', action);
        input.focus();
    }

    function action() {
        const nodeIdOrigin = View.openedRecordId;
        const neighborsNodeIds = [];

        neighborsExtend(graph, nodeIdOrigin, (nodeId, attr, depth) => {
            neighborsNodeIds.push(Number(nodeId));
            return depth >= input.valueAsNumber;
        }, { mode: window.focusMode});

        hideNodesAll();
        displayNodes(neighborsNodeIds);
    }
});

/**
 * @returns {GraphEngine}
 */

function getGraphEngine() {
    const graph = new GraphEngine();

    for (const { id, label } of data.nodes) {
        graph.addNode(id, {
            label
        });
    }
    for (const { source, target } of data.links) {
        graph.addEdge(source.id, target.id);
    }

    return graph;
}
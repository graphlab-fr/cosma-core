import GraphEngine from 'graphology';
import { bfsFromNode as neighborsExtend } from 'graphology-traversal/bfs';
import hotkeys from 'hotkeys-js';
import { displayNodes, hideNodesAll, displayNodesAll } from './graph';
import View from './view';

window.addEventListener('DOMContentLoaded', () => {
  /** @type {HTMLInputElement} */
  const checkbox = document.getElementById('focus-check');
  /** @type {HTMLSelectElement} */
  const modeSelect = document.getElementById('focus-mode-select');
  /** @type {HTMLInputElement} */
  const input = document.getElementById('focus-input');

  if (focusIsActive === false) {
    return;
  }

  checkbox.checked = false;

  let focusMode;
  let graph = getGraphEngine();

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
      input.removeEventListener('input', display);
      modeSelect.removeEventListener('change', changeMode);
      displayNodesAll();
    }
  });

  function active() {
    if (View.openedRecordId === undefined) {
      checkbox.checked = false;
      return;
    }

    changeMode();
    modeSelect.addEventListener('change', changeMode);

    display();
    input.classList.add('active');
    input.addEventListener('input', display);
    input.focus();
  }

  function display() {
    const nodeIdOrigin = View.openedRecordId;
    const neighborsNodeIds = [];

    console.log(focusMode);

    neighborsExtend(
      graph,
      nodeIdOrigin,
      (nodeId, attr, depth) => {
        neighborsNodeIds.push(Number(nodeId));
        return depth >= input.valueAsNumber;
      },
      { mode: focusMode }
    );

    hideNodesAll();
    displayNodes(neighborsNodeIds);
  }

  function changeMode() {
    focusMode = modeSelect.value;
    display();
  }
});

/**
 * @returns {GraphEngine}
 */

function getGraphEngine() {
  const graph = new GraphEngine();

  for (const { id, label } of data.nodes) {
    graph.addNode(id, {
      label,
    });
  }
  for (const { source, target } of data.links) {
    graph.addEdge(source.id, target.id);
  }

  return graph;
}

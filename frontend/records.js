import View from './view';
import historique from './history';
import { highlightNodes, unlightNodes } from './graph';
import hotkeys from 'hotkeys-js';

const recordContainer = document.getElementById('record-container');

window.openRecord = function (id, history = true) {
  const recordContent = document.getElementById(id);

  if (!recordContent) {
    return;
  }

  if (View.openedRecordId !== undefined) {
    // hide last record
    document.getElementById(View.openedRecordId).classList.remove('active');
  }

  // open records container
  recordContainer.classList.add('active');
  // adjust record view
  recordContainer.scrollTo({ top: 0 });

  // show record
  recordContent.classList.add('active');

  View.openedRecordId = id;

  // reset nodes highlighting
  unlightNodes();
  highlightNodes([id]);

  if (history) {
    // page's <title> become record's name
    const recordTitle = recordContent.querySelector('h1').textContent;
    historique.actualiser(id, recordTitle);
  }
};

/**
 * Close the record reading panel & the opended one
 */

window.closeRecord = function () {
  recordContainer.classList.remove('active');
  document.getElementById(View.openedRecordId).classList.remove('active');
  View.openedRecordId = undefined;
  unlightNodes();
};

hotkeys('escape', (e) => {
  e.preventDefault();
  closeRecord();
});

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (hash) {
    const recordId = hash.substring(1);
    openRecord(recordId);
  }
});

// At navigation travel, with forward/backward webbrowser's buttons
window.onpopstate = function (e) {
  if (e.state === null) {
    return;
  }
  // open record from a history entry
  const timeline = e.state.hist,
    recordId = timeline[timeline.length - 1];

  openRecord(recordId, false);
};

const sortContainer = document.querySelectorAll('[data-sort]');
for (const container of sortContainer) {
  const box = container.querySelectorAll('.sort-box'),
    increasing = box[0],
    decreasing = box[1],
    btn = container.querySelector('.sort-btn');

  let isIncreasing = true;

  btn.addEventListener('click', () => {
    if (isIncreasing) {
      btn.textContent = 'Z-A';
      increasing.classList.remove('active');
      decreasing.classList.add('active');
      isIncreasing = false;
    } else {
      btn.textContent = 'A-Z';
      increasing.classList.add('active');
      decreasing.classList.remove('active');
      isIncreasing = true;
    }
  });
}

const indexContainer = document.getElementById('index');

/**
 * Hide items from the index list that correspond to the nodes ids
 * @param {array} nodeIds - List of nodes ids
 */

function hideFromIndex(nodesIds) {
  for (const indexItem of nodesIds) {
    const indexItems = indexContainer.querySelectorAll('[data-index="' + indexItem + '"]');
    indexItems.forEach((elt) => {
      elt.style.display = 'none';
    });
  }
}

/**
 * Hide all items from the index list
 */

function hideAllFromIndex() {
  indexContainer.querySelectorAll('[data-index]').forEach((elt) => {
    elt.style.display = 'none';
  });
}

/**
 * Display items from the index list that correspond to the nodes ids
 * @param {array} nodeIds - List of nodes ids
 */

function displayFromIndex(nodesIds) {
  nodesIds = nodesIds.filter(function (nodeId) {
    // hidden nodes can not be displayed
    const nodeIsHidden = data.nodes.find((i) => i.id === nodeId).hidden;
    if (nodeIsHidden === false) {
      return true;
    }
  });

  for (const indexItem of nodesIds) {
    const indexItems = indexContainer.querySelectorAll('[data-index="' + indexItem + '"]');
    indexItems.forEach((elt) => {
      elt.style.display = null;
    });
  }
}

/**
 * Display all items from the index list
 */

function displayAllFromIndex() {
  const indexItems = indexContainer.querySelectorAll('[data-index]');
  indexItems.forEach((elt) => {
    elt.style.display = null;
  });
}

export { hideFromIndex, hideAllFromIndex, displayFromIndex, displayAllFromIndex };

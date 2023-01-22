/**
 * @file Select filters elts and activate them by the ids them contain.
 * @author Guillaume Brioudes
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

/**
 * @typedef Filter
 * @type {object}
 * @property {boolean} active
 * @property {string[]} nodes
 */

import { displayNodes, hideNodes } from './graph';
import { setCounters } from './counter';
import filterPriority from './filterPriority';

/** @type {string[]} */
const filtersName = Object.keys(filterList);

/**
 * Toggle a filter from his checkbox
 */

function toggleFilter(filterName) {
  if (filtersName.includes(filterName) === false) {
    throw new Error('This filter does not exist.');
  }

  /** @type {HTMLInputElement} */
  const input = document.getElementById(`filter-${filterName}`);
  /** @type {Filter} */
  const { active, nodes } = filterList[filterName];
  if (active) {
    hideNodes(nodes, filterPriority.filteredByType);

    filterList[filterName].active = false;
    input.checked = false;
  } else {
    displayNodes(nodes, filterPriority.filteredByType);

    filterList[filterName].active = true;
    input.checked = true;
  }

  setCounters();
}

window.addEventListener('DOMContentLoaded', () => {
  /** @type {HTMLInputElement[]} */
  const filtersInput = [];

  for (const filterName of filtersName) {
    /** @type {Filter} */
    const { active } = filterList[filterName];
    /** @type {HTMLInputElement} */
    const input = document.getElementById(`filter-${filterName}`);
    input.checked = active;

    filtersInput.push(input);
  }

  let filterNameAltMode;
  for (const input of filtersInput) {
    const { name: filterName, checked: active } = input;

    input.parentElement.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();

      const altMode = e.altKey;

      if (altMode) {
        if (filterNameAltMode === filterName) {
          displayHidden();
          filterNameAltMode = undefined;
        } else {
          hideAllButOne(filterName);
          filterNameAltMode = filterName;
        }
      } else {
        toggleFilter(filterName);
        filterNameAltMode = undefined;
      }
    });
  }

  /**
   * Display one filter and hide others
   * @param {string} oneFilterName
   */

  function hideAllButOne(oneFilterName) {
    /** @type {HTMLInputElement|undefined} */
    let oneFilterInput;

    /**
     * Hide all
     */
    const nodesToHide = [];
    for (const input of filtersInput) {
      const { name: filterName, checked: active } = input;
      if (filterName === oneFilterName) {
        oneFilterInput = input;
        continue;
      }
      if (active === false) {
        continue;
      }

      /** @type {Filter} */
      const { nodes } = filterList[filterName];
      nodesToHide.push(...nodes);

      filterList[filterName].active = false;
      input.checked = false;
    }

    hideNodes(nodesToHide, filterPriority.filteredByType);

    /**
     * Display one
     */
    if (filterList[oneFilterName].active === false) {
      /** @type {Filter} */
      const { nodes } = filterList[oneFilterName];
      displayNodes(nodes, filterPriority.filteredByType);

      filterList[oneFilterName].active = true;
      oneFilterInput.checked = true;
    }

    setCounters();
  }

  /**
   * Display nodes from deactivated filters
   */

  function displayHidden() {
    const nodesToDisplay = [];
    for (const input of filtersInput) {
      const { name: filterName, checked: active } = input;
      if (active) {
        continue;
      }

      /** @type {Filter} */
      const { nodes } = filterList[filterName];
      nodesToDisplay.push(...nodes);

      filterList[filterName].active = true;
      input.checked = true;
    }

    displayNodes(nodesToDisplay, filterPriority.filteredByType);

    setCounters();
  }
});

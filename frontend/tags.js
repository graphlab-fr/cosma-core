import { displayNodes, hideNodesAll, displayNodesAll } from './graph';

window.addEventListener('DOMContentLoaded', () => {
  /** @type {HTMLFormElement} */
  const form = document.getElementById('tags-form');
  /** @type {HTMLSelectElement} */
  const sortSelect = document.querySelector('.menu-tags .sorting-select');

  const tagsSorting = sorting.tags;
  let tagsState;

  sortTags();
  sortSelect.addEventListener('change', sortTags);

  changeTagsState();
  form.addEventListener('change', changeTagsState);

  function sortTags() {
    /** @type {HTMLLIElement[]} */
    const labelElements = form.querySelectorAll('label');
    const sortingKey = sortSelect.value;

    for (let i = 0; i < labelElements.length; i++) {
      const order = tagsSorting[i][sortingKey];
      const elt = labelElements[i];
      elt.style.order = order;
    }
  }

  function changeTagsState() {
    let formState = new FormData(form);
    formState = Object.fromEntries(formState);

    const nodeIdsToDisplay = new Set();

    tagsState = tagList
      .filter(({ name }) => !!formState[name])
      .forEach(({ nodes }) => {
        nodes.forEach((id) => nodeIdsToDisplay.add(id));
      });

    if (nodeIdsToDisplay.size === 0) {
      displayNodesAll();
      return;
    }

    hideNodesAll();
    displayNodes(Array.from(nodeIdsToDisplay));
  }

  window.activeTag = function (name) {
    /** @type {HTMLInputElement} */
    const input = form.querySelector(`input[name="${name}"]`);
    input.checked = !input.checked;
    form.dispatchEvent(new Event('change'));
  };
});

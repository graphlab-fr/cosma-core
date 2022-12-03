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

    tagsState = tagList.map(({ name }) => {
      return [name, !!formState[name]];
    });
  }
});

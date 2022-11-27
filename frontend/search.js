import Fuse from 'fuse.js/dist/fuse.basic';
import hotkeys from 'hotkeys-js';

let searchInput = document.getElementById('search');
let resultContainer = document.getElementById('search-result-list');

let maxResultNb = 5,
  resultList = [],
  selectedResult = 0;

searchInput.value = '';

searchInput.addEventListener('focus', () => {
  const fuse = new Fuse(data.nodes, {
    includeScore: false,
    keys: ['label'], // search field from nodes metas
  });

  searchInput.addEventListener('input', () => {
    resultContainer.innerHTML = '';
    selectedResult = 0;
    resultList = [];

    if (searchInput.value === '') {
      return;
    }

    resultList = fuse.search(searchInput.value);

    for (let i = 0; i < maxResultNb; i++) {
      let result = resultList[i];

      if (result === undefined) {
        break;
      }
      // include search result element on DOM
      var resultElement = document.createElement('li');
      resultElement.classList.add('search-result-item');
      resultElement.innerHTML = `<span class="record-type-point" style="color:var(--n_${result.item.type})">⬤</span>
            <span>${result.item.label}</span>`;
      resultContainer.appendChild(resultElement);

      if (i === 0) {
        activeOutline(resultElement);
      }

      resultElement.addEventListener('click', () => {
        openRecord(result.item.id);
      });
    }
  });
});

hotkeys('s', (e) => {
  e.preventDefault();
  searchInput.focus();
});

document.addEventListener('keydown', keyboardResultNavigation);

function keyboardResultNavigation(e) {
  if (resultList.length === 0) {
    return;
  }

  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault();

      if (selectedResult === 0) {
        searchInput.focus();
        return;
      }

      removeOutlineElt();
      selectedResult--;
      activeOutline();

      break;
    case 'ArrowDown':
      e.preventDefault();

      if (selectedResult === maxResultNb - 1 || selectedResult === resultList.length - 1) {
        return;
      }

      removeOutlineElt();
      selectedResult++;
      activeOutline();

      if (selectedResult === 1) {
        searchInput.blur();
      }

      break;
    case 'Enter':
      e.preventDefault();
      openRecord(resultList[selectedResult].item.id);
      searchInput.blur();
      break;
  }
}

function activeOutline() {
  resultContainer.childNodes[selectedResult].classList.add('outline');
}

function removeOutlineElt() {
  resultContainer.childNodes[selectedResult].classList.remove('outline');
}

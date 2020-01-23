import renderHomeBeers from './beers.js';
import storage from './storage.js'

export const INPUT_STORAGE_ID = 'navbar-input';
export const STORAGE_TYPE = 'lStorage';

const { setItem, getItem } = storage('lStorage')

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('.input-search');

searchInput.value = getItem(INPUT_STORAGE_ID);

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  if (searchInput.validity.valid) {
    renderHomeBeers(searchInput.value);
    setItem(INPUT_STORAGE_ID, searchInput.value);
    searchForm.reset();
    searchInput.innerHTML = '';
  }
});

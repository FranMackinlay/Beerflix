import renderHomeBeers from './beers.js';
import renderDetail from './detail.js';
import storage from './storage.js';
import { INPUT_STORAGE_ID, STORAGE_TYPE } from './search.js';

const { getItem, setItem } = storage(STORAGE_TYPE);

const formInput = document.getElementById('searchInput');
const homeBtn = document.getElementById('homeBtn');
homeBtn.addEventListener('click', () => {
  setItem(INPUT_STORAGE_ID, '');
  page('/', () => {
    formInput.innerHTML = '';
    renderHomeBeers(getItem(INPUT_STORAGE_ID));
  });
});

page('/', () => {
  formInput.innerHTML = '';
  renderHomeBeers(getItem(INPUT_STORAGE_ID));
});

page('/beers/:id', (context) => {
  const { params: { id } } = context;
  renderDetail(id);

});
page();

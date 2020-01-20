import renderHomeBeers from './beers.js';
import renderDetail, {removeForm} from './detail.js';
import storage from './storage.js';
import { INPUT_STORAGE_ID, STORAGE_TYPE } from './search.js';

const { getItem } = storage(STORAGE_TYPE);


page('/', () => {
  console.log(getItem(INPUT_STORAGE_ID));
  removeForm();
  
  renderHomeBeers(getItem(INPUT_STORAGE_ID));  
  
});
page('/beers/:id', (context) => {
  console.log('Route /beers/:id');
  const {params: { id }} = context;
  console.log(id);
  renderDetail(id);

});
page();

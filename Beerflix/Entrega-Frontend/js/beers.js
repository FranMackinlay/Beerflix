import api from './api.js';
import { renderLoader } from './ui.js'

const { getBeers } = api();

const templateBeers = beer => {
  return `
    <a href="/beers/${beer.beerId}">
      <div class="beer-card">
        <header class="card-header">
          <h2>${beer.name}</h2>
          <div class="card-price-content">
            $${beer.price}
          </div>
        </header>
        <div class="card-content">
          <div class="card-content-image">
            <img src="${beer.image}">
          </div>
          <div class="card-content-text">
            <p id="beer-info-short">
              ${beer.brewersTips}
            </p>
          </div>
        </div>
      </div>
    </a>
  `;
};

const renderBeer = (element, items) => {
  const htmlBeers = items.slice(0, 10).map(function (beer, index) {
    if (index < 2) {
      return templateBeers({ ...beer });

    }
    return templateBeers({ ...beer });
  }).join('');

  element.innerHTML = `
    <div class="beer-list">
      ${htmlBeers}
    </div>
  `;
};


const renderHomeBeers = async search => {
  try {
    renderLoader('hide', 'show');
    const beers = await getBeers(search);
    const mainSection = document.querySelector('main');
    const header = document.querySelector('header');
    const listsDetail = document.querySelector('.lists-container');

    listsDetail.classList.remove('lists-detail');
    mainSection.classList.remove('main-detail');
    header.classList.remove('header-detail');

    renderBeer(mainSection, beers);

  } catch (err) {
    console.log(err);
  } finally {
    renderLoader('show', 'hide');
  }
};

export default renderHomeBeers;

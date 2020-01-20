import api from './api.js';

const detailTemplate = ({ id, name, image, summary } = {}) => {
  return `
    <div class="detail-section">
      <header id="${id}">
        <div class="title-section">
          <h1>${name}</h1>
        </div>
        <div class="image-container">
          <img src="${image ? image.original : '/images/defaultImage.png'}" />
        </div>
      </header>
      <div class="content">
        ${summary}
      </div>
    </div>
  `;
};

const quoteTemplate = ({quote, date}) => {
  return `
    <div class="list-item">
      <p>${quote}</p>
      <span>${date}</span>
    </div>
  `;
};

const quotesFormtemplate = `
  <div id="detail" class="detail-content"></div>
  <div class="quotes-list">
    <h2>Quotes</h2>
    <div id="quoteList">
    </div>
  </div>
  <form id="quote-form" class="quote-form" novalidate>
    <div class="quote-input">
      <label for="quote">Quote of this Beer</label>
      <input required id="quote" placeholder="Add your quote" class="input primary" type="text">
    </div>
    <button type="submit" class="button primary">Add quote</button>
  </form>
`;



const QUOTES_API = 'https://quotes-api-keepcoding.herokuapp.com/api/v1';

const {getBeerDetail} = api();
const {getQuotes, createQuote} = api(QUOTES_API);

const renderForm = id => {
  const formSection = document.querySelector('#detailSection');
  formSection.innerHTML = quotesFormtemplate;
  const quoteForm = document.getElementById('quote-form');
  const quotesInput = document.getElementById('quote');
  const quotesList = document.getElementById('quoteList');
  quoteForm.addEventListener('submit', async evento => {
    evento.preventDefault();
    if (quotesInput.validity.valid) {
      // Llamar API para crear Quote
      const result = await createQuote(id, quotesInput.value);
      // Renderizo o pinto en el DOM
      quoteList.innerHTML += quoteTemplate(result);
      quotesInput.value = '';
    }
    
  });
};

export const removeForm = () => {
  const formSection = document.querySelector('#searchInput');
  formSection.innerHTML = '';
};

const renderDetail = async id => {
  try {
    const [detail, quotes] = await Promise.all([
      getBeerDetail(id),
      getQuotes(id),
    ]);
    const template = detailTemplate(detail);
    const mainSection = document.querySelector('main');
    renderForm(id);
    const quoteList = document.querySelector('#quoteList');
    quoteList.innerHTML = quotes.map(quoteTemplate).join('');
    mainSection.innerHTML = template;
  } catch (err) {
    // manejo erores
    console.log(err);
  }
};

export default renderDetail;

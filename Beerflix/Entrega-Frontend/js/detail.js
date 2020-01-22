import api from './api.js';

const detailTemplate = ({ beerId, name, image, price, description, firstBrewed, brewersTips, likes} = {}) => {
  return `
    <div class="detail-section">
      <header id="${beerId}">
        <div class="title-section">
          <h1>${name}</h1>
        </div>
        <div class="image-container">
          <img src="${image}"/>
        </div>
        <div class="card-price-content">
          $${price}
        </div>
      </header>
      <div class="first-likes">
        <div class="likes">
          Likes: ${likes}
        </div>
      </div>
      <div class="firstBrewed">
          First Brewed: ${firstBrewed}
        </div>
      <div class="content">
        ${description}
      </div>
      <div class="more-info">
        <div class="brewersTips">
          <p>Tip:</p>
          
          ${brewersTips}
        </div>
        <div class="comment-likes">
          <div id="commentList">
            <p>Comments:</p>
          </div>
          
        </div>
      </div>
    </div>
  `;
};

const stringify = str => {
  return JSON.stringify(str);
};

const commentTemplate = ({ comment }) => {
  return `
    <div class="list-item">
      <p>${comment}</p>
    </div>
  `;
};

const commentsFormtemplate = `
  <div id="detail" class="detail-content"></div>
  <div class="comments-list">
    <h2>Comments</h2>
    
  </div>
  <form id="comment-form" class="comment-form" novalidate>
    <div class="comment-input">
      <label for="comment">comment of this Beer</label>
      <input required id="comment" placeholder="Add your comment" class="input primary" type="text">
    </div>
    <button type="submit" class="button primary">Add comment</button>
  </form>
`;

// const commentS_API = 'https://beerflix-api.herokuapp.com/api/v1/beers/1';

const { getBeerDetail } = api();
const { getComments, createComment } = api();

const renderForm = id => {
  const formSection = document.querySelector('comments-list');
  formSection.innerHTML = commentsFormtemplate;
  const commentForm = document.getElementById('comment-form');
  const commentsInput = document.getElementById('comment');
  const commentsList = document.getElementById('commentList');
  commentForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (commentsInput.validity.valid) {
      // Llamar API para crear comment
      const result = await createComment(id, commentsInput.value);
      // Renderizo o pinto en el DOM
      commentsList.innerHTML += commentTemplate(result);
      commentsInput.value = '';
    }
  });
};

const renderDetail = async id => {
  try {
    const [detail, comments] = await Promise.all([
      getBeerDetail(id),
      getComments(id)
    ]);
    const template = detailTemplate(detail.beer);
    console.log(template);
    const mainSection = document.querySelector('main');
    // renderForm(id);
    
    mainSection.innerHTML = template;
    const commentList = document.getElementById('commentList');
    commentList.innerHTML +=  comments.map(commentTemplate).join('');
  } catch (err) {
    // manejo erores
    console.log(err);
  }
};

export default renderDetail;

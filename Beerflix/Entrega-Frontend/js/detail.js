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
      <div id="first-likes">
        <div class="likes">
          Likes: ${likes}
        </div>
        <div id="like-button-container">
          <button type="submit" id="likeButton">Like this beer!</button> 
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
          <h2>Comments:</h2>
          <div id="commentForm">
          </div>
          <div id="commentList">
          </div>  
        </div>
        
      </div>
    </div>
  `;
};

const stringify = str => {
  return JSON.stringify(str);
};

const commentTemplate = ({ comment, dateComment }) => {
  return `
    <div class="list-item">
      <p>${comment}</p>
      ${dateComment}
    </div>
  `;
};

const commentsFormtemplate = `
  <div id="detail" class="detail-content"></div>
  <form id="comment-form" class="comment-form" novalidate>
    <div class="comment-input">
      <input required id="comment" placeholder="Add your comment" class="input primary" type="text">
    </div>
    <button type="submit" class="button primary">Add comment</button>
  </form>
`;

// const commentS_API = 'https://beerflix-api.herokuapp.com/api/v1/beers/1';

const { getBeerDetail } = api();
const { getComments, createComment, addLike } = api();

const renderForm = id => {
  const formSection = document.getElementById('commentForm');
  formSection.innerHTML = commentsFormtemplate;
  const commentForm = document.getElementById('comment-form');
  const commentsInput = document.getElementById('comment');
  const commentsList = document.getElementById('commentList');
  commentForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (commentsInput.validity.valid) {
      // Llamar API para crear comment
      const result = await createComment(id, commentsInput.value);
      console.log(result);

      // Renderizo o pinto en el DOM
      commentsList.innerHTML += commentTemplate(result);
      commentsInput.value = '';
    }
  });
};

const likesTemplate = likes => {
  return `
    <div class="likes">
      Likes: ${likes}
    </div>
    <div id="like-button-container">
     <button type="submit" id="likeButton">Like this beer!</button> 
    </div>`;
}

const renderLikes = id => {
  const likeButton = document.getElementById('likeButton');
  likeButton.addEventListener('click', async event => {
    console.log('click!!!');
    event.preventDefault();
    const firstLikes = document.getElementById('first-likes');
    const like = await addLike(id);
    firstLikes.innerHTML = likesTemplate(like);
    // console.log(like); 

  });
};

const renderDetail = async id => {
  try {
    const [detail, comments] = await Promise.all([
      getBeerDetail(id),
      getComments(id)
    ]);
    const template = detailTemplate(detail.beer);
    const mainSection = document.querySelector('main');
    const header = document.querySelector('header');
    header.style.display = 'none';
    mainSection.style.margin = '10px auto';
    mainSection.style.background = '#DEB841';
    mainSection.style.padding = '10px';
    mainSection.style.borderRadius = '20px';
    
    
    
    mainSection.innerHTML = template;
    renderForm(id);
    renderLikes(id);
    const commentList = document.getElementById('commentList');
    commentList.innerHTML +=  comments.map(commentTemplate).join('');
  } catch (err) {
    // manejo erores
    console.log(err);
  }
};

export default renderDetail;

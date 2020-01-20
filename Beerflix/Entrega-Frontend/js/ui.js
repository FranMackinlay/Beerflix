export const replace = element => (removeClass, addClass) => {
  element.classList.remove(removeClass);
  element.classList.add(addClass);
};


const loader = document.querySelector('#loader');

export const renderLoader = replace(loader);

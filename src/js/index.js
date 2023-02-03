import '../css/formGallery.css';
import Notiflix from 'notiflix';

console.log('start');

const inputName = document.querySelector('[name="searchQuery"]');
const searchButton = document.querySelector(".searchButton");
const galleryContainer = document.querySelector(".gallery");

searchButton.addEventListener("click", e => {
    e.preventDefault();
  let itemName = inputName.value.trim();
  if (itemName === "") return galleryContainer.innerHTML = "";
  
  fetchItems(itemName)
      .then(items => renderItems(items))
    .catch(error => {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        console.log(error);
    });
});

function fetchItems(itemName) {
    return fetch(`https://pixabay.com/api/?key=33296379-dab9a6cf136214dcc7548d115&q=${itemName}&image_type=photo`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
        }).catch(error => console.log("Error: ", error));
};

function renderItems(items) {
    console.log(items);
    const markup = items.hits
        .map(({webformatURL, likes, views, comments, downloads}) => {
            return `<div class="photo-card"> 
          <img src="${webformatURL}" alt="" loading="lazy" /> 
          <div class="info">
          <p class="info-item"> <b>Likes</b> ${likes} </p> 
          <p class="info-item"> <b>Views</b> ${views} </p> 
          <p class="info-item"> <b>Comments</b> ${comments} </p> 
          <p class="info-item"> <b>Downloads</b> ${downloads} </p> 
          </div> 
          </div>`;
        }).join("");
  
    galleryContainer.innerHTML = markup;
    console.log("działa")
};


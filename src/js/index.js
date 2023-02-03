import '../css/formGallery.css';
import Notiflix from 'notiflix';

console.log('start');

const inputName = document.querySelector('[name="searchQuery"]');
const searchButton = document.querySelector(".searchButton");
const galleryContainer = document.querySelector(".gallery");

fetch(`https://pixabay.com/api/?key=33296379-dab9a6cf136214dcc7548d115&q=yellow+flowers&image_type=photo`, {
    method: 'GET',
    
})
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log("Error: ", error));

searchButton.addEventListener("click", e => {
    e.preventDefault();
  let itemName = inputName.value.trim();
  if (itemName === "") return galleryContainer.innerHTML = "";
  
  fetchItems(itemName)
    .then(items => renderItems(items))
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no item with that name');
    });
});

function fetchItems(itemName) {
    // return fetch(`https://pixabay.com/api/?key33296379-dab9a6cf136214dcc7548d115&q=${itemtName.value}&image_type=photo`)
    return fetch(`https://pixabay.com/api/?key=33296379-dab9a6cf136214dcc7548d115&q=yellow+flowers&image_type=photo`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
        }).catch(error => console.log("Error: ", error));
};

function renderItems(items) {
    const markup = items
        .map((item) => {
          return `<div class="photo-card">
                <img src="${item.webformatURL}" alt="" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                    <b>Likes</b>
                    </p>
                    <p class="info-item">
                    <b>Views</b>
                    </p>
                    <p class="info-item">
                    <b>Comments</b>
                    </p>
                    <p class="info-item">
                    <b>Downloads</b>
                    </p>
                </div>
            </div>`;
        }).join("");
  
    galleryContainer.innerHTML = markup;
};
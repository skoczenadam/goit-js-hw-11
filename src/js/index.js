import '../css/formGallery.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";

console.log('start');

const inputName = document.querySelector('[name="searchQuery"]');
const searchButton = document.querySelector(".searchButton");
const galleryContainer = document.querySelector(".gallery");
const loadMoreButton = document.querySelector(".load-more");

let page = 1;
const per_page = 40;
const orientation = "horizontal";
const safesearch = true;

let maxPictures = 0;

loadMoreButton.addEventListener("click", () => {
    page += 1;
    let itemName = inputName.value.trim();
    if (itemName === "") return galleryContainer.innerHTML = "";
      fetchItems(itemName)
          .then(items => {
            renderItems(items);
          })
    .catch(error => {
        console.log(error);
    });
})

const activeFetch = (e) => {
  e.preventDefault();
    loadMoreButton.classList.add("hidden");
    galleryContainer.innerHTML = "";
    page = 1;
  let itemName = inputName.value.trim();
    if (itemName === "") {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    };
  
  fetchItems(itemName)
      .then(items => renderItems(items))
    .catch(error => {
        console.log(error);
    });
}

searchButton.addEventListener("click", e => activeFetch(e));

function fetchItems(itemName) {
    const params = new URLSearchParams({
        page: page,
        per_page: per_page,
        orientation: orientation,
        safesearch: safesearch
    });
    return fetch(`https://pixabay.com/api/?key=33296379-dab9a6cf136214dcc7548d115&q=${itemName}&image_type=photo&${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
        }).catch(error => console.log("Error: ", error));
};

function renderItems(items) {
    console.log(items);
    maxPictures += 40;
    console.log(maxPictures)
    if (items.hits.length === 0) return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    const markup = items.hits
        .map(({webformatURL, tags, likes, views, comments, downloads}) => {
            return `<div class="photo-card"> 
          <img src="${webformatURL}" alt="${tags}" loading="lazy" /> 
          <div class="info">
          <p class="info-item"> <b>Likes</b> ${likes} </p> 
          <p class="info-item"> <b>Views</b> ${views} </p> 
          <p class="info-item"> <b>Comments</b> ${comments} </p> 
          <p class="info-item"> <b>Downloads</b> ${downloads} </p> 
          </div> 
          </div>`;
        }).join("");
  
    galleryContainer.insertAdjacentHTML("beforeend", markup);
    loadMoreButton.classList.remove("hidden");
    if (maxPictures >= 500) {
        loadMoreButton.classList.add("hidden");
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    } else if(maxPictures <= 40) {
        loadMoreButton.classList.add("hidden");
        Notiflix.Notify.info("Hooray! We found totalHits images.");
    }
};
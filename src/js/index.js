import '../css/formGallery.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const inputName = document.querySelector('[name="searchQuery"]');
const searchButton = document.querySelector(".searchButton");
const galleryContainer = document.querySelector(".gallery");
const loadMoreButton = document.querySelector(".load-more");

let page = 1;
const per_page = 40;
const orientation = "horizontal";
const safesearch = true;

let maxPictures = 0;

var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, });

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

const activeFetch = async e => {
    e.preventDefault();
    maxPictures = 0;
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

async function fetchItems(itemName) {
    const params = new URLSearchParams({
        page: page,
        per_page: per_page,
        orientation: orientation,
        safesearch: safesearch,
    });

    try {
        const response = await axios.get(
            `https://pixabay.com/api/?key=33296379-dab9a6cf136214dcc7548d115&q=${itemName}&image_type=photo&${params}`
        );
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
    }
}

function renderItems(items) {
    maxPictures += 40;
    if (items.hits.length === 0) return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    const markup = items.hits
        .map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
            return `<div class="photo-card"> 
            <a class="gallery-image" href="${largeImageURL}">
          <img class="gallery-item" src="${webformatURL}" alt="${tags}" loading="lazy" /> 
          </a>
          <div class="info">
          <p class="info-item"> <b>Likes</b> ${likes} </p> 
          <p class="info-item"> <b>Views</b> ${views} </p> 
          <p class="info-item"> <b>Comments</b> ${comments} </p> 
          <p class="info-item"> <b>Downloads</b> ${downloads} </p> 
          </div> 
          </div>`;
        }).join("");
  
    galleryContainer.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
    loadMoreButton.classList.remove("hidden");
    if (page > 1) {
        const { height: cardHeight = 350 } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
    }
    if (1 <= items.totalHits < 40 && maxPictures === 40) {
        console.log('mniej niż 40')
        Notiflix.Notify.info(`Hooray! We found ${items.totalHits} images.`);
        if (maxPictures >= items.totalHits) loadMoreButton.classList.add("hidden");
    } else if(maxPictures >= items.totalHits) {
        loadMoreButton.classList.add("hidden");
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
};
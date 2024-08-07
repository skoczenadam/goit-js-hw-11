import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector("form");
const input = document.querySelector(`input[type=text]`);
const gallery = document.querySelector("ul");
const loader = document.querySelector("div");

const reset = () => {
  gallery.innerHTML = "";
  input.value = "";
}

const getPixabay = e => {
  e.preventDefault();
  const question = input.value;
  reset();

  if (gallery.innerHTML !== "") {
    loader.classList.add("disable");
  } else {
    loader.classList.remove("disable");
  }
  
  const getPixaInfo = new URLSearchParams({
    key: "33296379-dab9a6cf136214dcc7548d115",
    q: question,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
  });

  fetch(`https://pixabay.com/api/?${getPixaInfo}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(galleryList => {
      const galleryLi = galleryList.hits.map(image => {
        return `<li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img class="gallery-image"
          src="${image.webformatURL}" 
          alt="${image.tags}"
          /><div class="info">
          <p class="info-group"><span class="info-text">Likes</span> <span class="info-number">${image.likes}</span></p>
          <p class="info-group"><span class="info-text">Views</span> <span class="info-number">${image.views}</span></p>
          <p class="info-group"><span class="info-text">Comments</span> <span class="info-number">${image.comments}</span></p>
          <p class="info-group"><span class="info-text">Downloads</span> <span class="info-number">${image.downloads}</span></p>
          </div>
          </a>
        </li>`
      })
        .join("");
      gallery.insertAdjacentHTML("beforeend", galleryLi);

      if (gallery.innerHTML !== "") {
        loader.classList.add("disable");
      } else {
        loader.classList.remove("disable");
      }

      if (galleryList.total === 0) {
        loader.classList.add("disable");
        iziToast.show({
          message: '❌Sorry, there are no images matching your search query. Please try again!',
          color: 'red',
          position: 'topRight'
        })
      }
      const lightbox = new SimpleLightbox(`.gallery a`, {
        captionDelay: 250,
      });

      lightbox.refresh();

    })
    .catch(error => console.log(error));
}

form.addEventListener("submit", getPixabay);
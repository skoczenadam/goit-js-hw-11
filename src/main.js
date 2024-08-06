import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector("form");
const input = document.querySelector(`input[type=text]`);
const button = document.querySelector(`button[type=submit]`);
const galleryLists = document.querySelector("ul");
const loader = document.querySelector("div");

const reset = () => {
  galleryLists.innerHTML = "";
  input.value = "";
}

const getPixabay = e => {
  e.preventDefault();
  const question = input.value;
  reset();

  if (galleryLists.innerHTML !== "") {
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
    .then(gallery => {
      const galleryLi = gallery.hits.map(image => {
        return `<li>
          <img src="${image.webformatURL}" alt="${image.tags}">
          <p>Likes: ${image.likes}</p>
          <p>Views: ${image.views}</p>
          <p>Comments: ${image.comments}</p>
          <p>Downloads: ${image.downloads}</p>
        </li>`
      })
        .join("");
      galleryLists.insertAdjacentHTML("beforeend", galleryLi);

      if (galleryLists.innerHTML !== "") {
        loader.classList.add("disable");
      } else {
        loader.classList.remove("disable");
      }

      if (gallery.total === 0) {
        loader.classList.add("disable");
        iziToast.show({
          message: '❌Sorry, there are no images matching your search query. Please try again!',
          color: 'red',
          position: 'topRight'
        })
      }

    })
    .catch(error => console.log(error));
}

form.addEventListener("submit", getPixabay);
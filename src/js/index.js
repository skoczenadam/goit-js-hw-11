import '../css/formGallery.css';

console.log('start');

const inputName = document.querySelector('[name="searchQuery"]');
const searchButton = document.querySelector(".searchButton");
const galleryContainer = document.querySelector(".gallery");

searchButton.addEventListener("submit", () => {
    fetch(`https://pixabay.com/api/?key33296379-dab9a6cf136214dcc7548d115&q=${inputName.value}&image_type=photo`);
});
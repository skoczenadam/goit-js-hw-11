const form = document.querySelector("form");
const input = document.querySelector(`input[type=text]`);
const button = document.querySelector(`button[type=submit]`);

const getPixaInfo = new URLSearchParams({
  key: "33296379-dab9a6cf136214dcc7548d115",
  q: input.value,
  image_type: "photo",
  orientation: "horizontal",
  safesearch: true,
});

const getPixabay = e => {
  e.preventDefault();
  fetch(`https://pixabay.com/api/?${getPixaInfo}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(post => console.log(post))
    .catch(error => console.log(error));
}

form.addEventListener("submit", getPixabay)
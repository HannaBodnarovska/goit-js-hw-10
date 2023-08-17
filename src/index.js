import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const catImage = document.querySelector(".cat-image");
const breedName = document.querySelector(".breed-name");
const description = document.querySelector(".description");
const temperament = document.querySelector(".temperament");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

async function populateBreeds() {
  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    showError();
  } finally {
    loader.style.display = "none";
    breedSelect.style.display = "block";
  }
}

async function fetchAndDisplayCat(breedId) {
  try {
    const cat = await fetchCatByBreed(breedId);
    catImage.src = cat.url;
    breedName.textContent = cat.breeds[0].name;
    description.textContent = cat.breeds[0].description;
    temperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
    catInfo.style.display = "block";
  } catch (error) {
    showError();
  } finally {
    loader.style.display = "none";
  }
}

function showError() {
  error.style.display = "block";
  setTimeout(() => {
    error.style.display = "none";
  }, 3000);
}

breedSelect.addEventListener("change", (event) => {
  loader.style.display = "block";
  breedSelect.style.display = "none";
  catInfo.style.display = "none";
  fetchAndDisplayCat(event.target.value);
});

populateBreeds();

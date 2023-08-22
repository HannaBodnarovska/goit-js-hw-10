import axios from "axios";
import Notiflix from "notiflix";
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

axios.defaults.headers.common["x-api-key"] = "live_H719qlovNp5onk7SgALaQO9nCvFcNpHdtVeXT8E7vMLN7oXTPHXifZWyA6P2P7um";

const breedSelect = document.getElementById("breedSelect");
const catInfo = document.getElementById("catInfo");

const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

Notiflix.Notify.init({ position: "right-bottom", timeout: 3000 });

async function populateBreeds() {
  try {
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join("");
    fetchAndDisplayCat(breeds[0].id); 
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
    const selectedBreed = cat.breeds[0];
    catInfo.innerHTML = `
      <img src="${cat.url}" alt="${selectedBreed.name}" class="cat-image">
      <h2 class="breed-name">${selectedBreed.name}</h2>
      <p class="description">${selectedBreed.description}</p>
      <p class="temperament">Temperament: ${selectedBreed.temperament}</p>
    `;
    catInfo.style.display = "block";
    error.style.display = "none";
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
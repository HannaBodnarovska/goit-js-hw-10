import axios from "axios";
import Notiflix from "notiflix";
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

axios.defaults.headers.common["x-api-key"] = "live_H719qlovNp5onk7SgALaQO9nCvFcNpHdtVeXT8E7vMLN7oXTPHXifZWyA6P2P7um";

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const catImage = document.querySelector(".cat-image");
const breedName = document.querySelector(".breed-name");
const description = document.querySelector(".description");
const temperament = document.querySelector(".temperament");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

Notiflix.Notify.init({ position: "right-bottom", timeout: 3000 });

async function populateBreeds() {
  try {
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join("");
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
    catImage.src = cat.url;
    breedName.textContent = selectedBreed.name;
    description.textContent = selectedBreed.description;
    temperament.textContent = `Temperament: ${selectedBreed.temperament}`;
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

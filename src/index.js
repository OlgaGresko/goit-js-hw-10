import { fetchBreeds, fetchCatByBreed } from "./cat-api"

const selectEl = document.querySelector(".breed-select");
const catInfoEl = document.querySelector(".cat-info");
const loaderEl = document.querySelector(".loader");
const errorEl = document.querySelector(".error");
let breeds;

function togglingHidden(...elements) {
    elements.forEach(element => {
        element.classList.toggle('hidden');
    })
}

function createBreedsMarkup() {
    let breedsList = breeds.map(breed => 
        `<option value="${breed.id}">${breed.name}</option>`)
        .join();
    selectEl.innerHTML = breedsList;
}

function createCardMarkup(breedImg, breedId) {
    catInfoEl.innerHTML = `<img src="${breedImg[0].url}" height="450px" alt="Cat"></img>`;
        let breed = breeds.find(breed => breed.id === breedId);
        catInfoEl.insertAdjacentHTML('beforeend', `<div><h1>${breed.name}</h1><p>${breed.description}</p><p><span>Temperament: </span>${breed.temperament}</p></div>`);
}

function createList() {
    togglingHidden(selectEl, loaderEl);
           
    fetchBreeds()
    .then(result => {
        breeds = result;
        createBreedsMarkup();
        return breeds;
        })
    .then(() => {
        togglingHidden(loaderEl, selectEl);
    })
    .catch((error) => {
        console.log(error.message);
        togglingHidden(loaderEl, errorEl);
    });  
}

function createCard(event) { 
    if (!errorEl.classList.contains('hidden')) {
        togglingHidden(errorEl);
    }
 
    if (event.target.tagName === !'OPTION') {
        return;
    } 

    let breedId = event.target.value; 
    togglingHidden(loaderEl);
               
    fetchCatByBreed(breedId)
    .then(breedImg => {
        createCardMarkup(breedImg, breedId);
    })
    .then(() => {
        togglingHidden(loaderEl);
    })
    .catch((error) => {
        console.log(error.message);
        togglingHidden(loaderEl, errorEl);
        catInfoEl.innerHTML='';
    }
    );    
}

togglingHidden(loaderEl, errorEl);

window.addEventListener('load', createList);
selectEl.addEventListener('change', createCard);




export { fetchBreeds, fetchCatByBreed };

const BASE_URL = 'https://api.thecatapi.com/v1/';
const options = {
    'x-api-key': 'live_lb7yb9rC7It7pKgmQJDhKTieyjB4XFV8D4jl997rT2RpXg7fuM1AZ2T8PHUPk6vG',

}

function fetchBreeds() {
    return fetch(`${BASE_URL}breeds`, options)
        .then(response => {
            if (response.ok) {
               return response.json(); 
            } else {
               throw new Error(response.status);
            }
        })
}


function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}images/search?breed_ids=${breedId}`, options)
        .then(response => {
            if (response.ok) {
               return response.json();
            } else {
               throw new Error(response.status);
            }
        })
}

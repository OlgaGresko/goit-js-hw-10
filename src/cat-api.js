export { fetchBreeds, fetchCatByBreed };

const options = {
    'x-api-key': 'live_lb7yb9rC7It7pKgmQJDhKTieyjB4XFV8D4jl997rT2RpXg7fuM1AZ2T8PHUPk6vG',

}

function fetchBreeds() {
    return fetch('https://api.thecatapi.com/v1/breeds', options)
        .then(response => response.json())
        .then(result => {
            return result;
        });
}


function fetchCatByBreed(breedId) {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, options)
        .then(response => response.json())
        .then(breedImg => {
            return breedImg;
        });
}

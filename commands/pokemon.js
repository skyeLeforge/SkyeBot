//file that access the pokemon api to get a random pokemon team and a link to it
const fetch = require("node-fetch")
const {getRandomArrayElement} = require("../helpers/getRandomArrayElement.js");


function randomPokemon(){
    //fetch a random pokemon using the pokeapi
    return (async () => {
        // request all pokemon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const json = await response.json();
        const pokemonList = json.results;
        const pokemon = getRandomArrayElement(pokemonList)
        return pokemon;

    })();
}

module.exports = {
    randomPokemon
}

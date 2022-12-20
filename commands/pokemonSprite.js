//file that access the pokemon api to get a pokemons sprite
const fetch = require("node-fetch")


function getSprite(pokemonUrl){
    //fetch a random pokemon using the pokeapi
    return (async () => {
        // request all pokemon
        const response = await fetch(pokemonUrl);
        const json = await response.json();
        let sprite = json.sprites.front_default
        const shiny = Math.random() * 4096;
        if (shiny === 0){
            sprite = json.sprites.front_default
        }

        return sprite;
    })();
}

module.exports = {
    getSprite
}

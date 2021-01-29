//file that access the Scryfall api to get a random card and a link to it
const fetch = require("node-fetch")


function randomCard(){
    //fetch a random card using the scryfall api
    return (async () => {
        const response = await fetch('https://api.scryfall.com/cards/random');
        const json = await response.json();
        return json;
    })();
}

module.exports = {
    randomCard
}

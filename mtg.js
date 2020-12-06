//file that access the Scryfall api to get a random card and a link to it

export function randomCard(){
    var parsedData


    //first fetch a random card using the scryfall api
    fetch('https://api.scryfall.com/cards/random')
     .then((response) => {
         return response.json()
     })
     .then((data) => {
         parsedData = JSON.parse(data)
     })
     .catch((err) => {
       // do the error here
        console.log(err)

        //put in dummy data so the error is known
        parsedData.name = "ERROR"
        parsedData.image_uris.normal = "https://miro.medium.com/max/978/1*pUEZd8z__1p-7ICIO1NZFA.png"
     })

     return parsedData

}


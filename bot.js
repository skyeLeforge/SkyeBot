const { randomCard } = require("./commands/mtg.js");
const { randomPokemon } = require("./commands/pokemon.js");
const { pokemonSprite } = require("./commands/pokemonSprite.js");
const { capitalizeEveryWord } = require("./helpers/captializeEveryWord.js");
const owoify = require('owoify-js').default
const Discord = require("discord.js");

const bot = new Discord.Client();
const token = process.env.APIKEY


bot.on('ready', () => {
  console.log('bot is ready')
})

bot.login(token)

let prefix = ';'

bot.on('message', async (msg) => {
  //if our message doesnt start with our defined prefix, dont go any further into function
  console.log(msg.content)
  if (msg.content.search('craz') !== -1 && !msg.author.bot){
    console.log('is a crazy message')
    msg.channel.send('Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy')
  }
  if (
    msg.content.search('/x.com') !== -1 ||
    msg.content.search('/twitter.com') !== -1
    ) {
      let split = '/twitter.com'
      if (msg.content.search('/x.com') !== -1) {
        split = '/x.com'
      }
      const splitMsg = msg.content.split(split)
      const newMessage = `A Message by: ${msg.author.username}\
                          \n${splitMsg[0]}/fxtwitter.com${splitMsg[1]}`
      msg.channel.send(newMessage)
      msg.delete()
    }

  if (!msg.content.startsWith(prefix)) {
    console.log('no prefix')

    return
  }
  
  //slices off prefix from our message, then trims extra whitespace, then returns our array of words from the message
  const args = msg.content.slice(prefix.length).trim().split(' ')

  //splits off the first word from the array, which will be our command
  const command = args.shift().toLowerCase()
  //log the command
  console.log('command: ', command)
  //log any arguments passed with a command
  console.log('args: ', args)

  if (command === 'ego') {
    msg.react("😀")
    msg.reply('wow, what a great post')
  }


  if (command === 'help') {
    msg.channel.send('Here are the commands currently aviliable:\
                      \nhelp: Gives you help\
                      \nego: Boost Your Ego\
                      \nstinky: calls you stinky\
                      \nclear x: removed the last x messages in a channel\
                      \nprefix _: Changes the prefix to whatever you put after the space\
                      \nculture: puts the command to play culture for easy use\
                      \nmtg: Runs an algorithm on all the secret data we have collected on you to determine the best mtg card for your next deck\
                      \nowo: owoifys your text\
                      \npokemon: gives you youre Perfect Pokemon team!')
  }

  if (command === 'prefix') {
    prefix = args[0]
    msg.channel.send(`Changed prefix to ${args[0]} `)
  }

  if (command === 'stinky') {
    msg.channel.send(msg.author.username + ' is stinky')
  }

  if (command === 'pokemon') {
    msg.channel.send('Calculating the perfect team, please wait...')
    getTeam().then((res) => {
      msg.channel.send(res.text)
      res.sprites.forEach((sprite) => {
        msg.channel.send(sprite)
      })
    })
  }



  if (command === 'rimg') {
    msg.channel.send(`We're NOT doing this. ok`)
  }

  if (command === 'mtg') {
    randomCard().then(function (cardData) {
      let cardName = cardData.name
      let cardIMG = cardData.image_uris.normal
      msg.channel.send(`SkyeBot reccomends you put ${cardName} in your next mtg deck!`)
      msg.channel.send(cardIMG)
    })

  }

  if (command === 'owo') {
    let toOwo = msg.content.slice(prefix.length + command.length).trim()
    if (toOwo.length > 0)
      msg.channel.send(owoify(toOwo))
    else
      msg.channel.send(`I'm a owo you`)
  }

  if (command === 'culture') {
    msg.channel.send('```-play https://open.spotify.com/playlist/2bmhCh6qv4mbbqgfzVFIiE?si=5niRbaZ-TJGeR6z7GA6krw```')
  }

  if (command === "clear") {
    //default deletes message itself plus previous
    let num = 2;

    //if argument is provided, we need to convert it from string to number
    if (args[0]) {
      //add 1 to delete clear command itself
      num = parseInt(args[0]) + 1;
      //bulk delete the messages
      msg.channel.bulkDelete(num);
      //notify channel of deleted messages
      msg.channel.send(`deleted  ${args[0]} posts for you`);
    } else {
      console.log('0 messages to delete')
      msg.channel.send('Ya didnt tell me how many messages to delete, stinky');
    }

  }
})


const getTeam = async () => {
  let text = 'Here is your perfect team:'
  let sprites = []
  for (i = 0; i < 6; i++) {
    const pokemon = await randomPokemon()
    const sprite = await pokemonSprite(pokemon.url)
    const capital = capitalizeEveryWord(pokemon.name)
    text += `\n ${capital}`
    sprites.push(sprite)
  }
  return {text: text, sprites: sprites}

}
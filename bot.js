const Discord = require("discord.js");

const bot = new Discord.Client();
const token = 'Nzg0NTI1OTc3Nzk1NTU5NDU0.X8qkwA.oxVXWCRfC_KMeL2QLWuft0nzVQU'

bot.on('ready', () => {
  console.log('bot is ready')
})

bot.login(token)

const prefix = '!'

bot.on('message', async (msg) => {
  //if our message doesnt start with our defined prefix, dont go any further into function
  if(!msg.content.startsWith(prefix)) {
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
  console.log(args)

  if(command === 'ego') {
    msg.react("😀")
    msg.reply('wow, what a great post')
  }

  if (command === 'hi'){
      msg.channel.send("Hi <@374448245268807681>")
  }


  if(command === 'stinky'){
      msg.channel.send(msg.author.username +' is stinky')
  }

  if (command === "clear") {
    //default deletes message itself plus previous
    let num = 2;
    
    //if argument is provided, we need to convert it from string to number
    if (args[0]) {
      //add 1 to delete clear command itself
      num = parseInt(args[0]) + 1;
    }

    if (num==1){
        console.log('0 messages')
        msg.channel.send('Ya didnt tell me how many messages to send, stinky');
    }else{
        //bulk delete the messages
        msg.channel.bulkDelete(num);
        //notify channel of deleted messages
        msg.channel.send(`deleted  ${args[0]} posts for you`);
    }
  }


  
})
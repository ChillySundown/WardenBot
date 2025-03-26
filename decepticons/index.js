//THIS BOT IS USED TO TEST FUNCTIONALITY OF IRONHIDE IN OTHER SERVERS
require('dotenv').config()
const {Client, IntentsBitField, Message} = require('discord.js')
const scamList = ['Hi everyone! I\'m trying to sell my tickets for the Billie Eilish concert, \'HIT ME HARD AND SOFT,\' on Friday, Dec 20th, at 7 PM, at the Kia Forum in Inglewood, CA. Hit me up if you\'re interested! 310 740-9642.',
    'Hello@everyone@here I want to give out my  Southeast Technical institute MacBook 2020 & Charger** for free, it\'s in perfect health and good as new, alongside a charger so it\'s perfect, I want to give it out because I just got a new model and I thought of giving out the old one to someone who can\'t afford one and is in need of it... Strictly First come first serve ! DM IF YOU ARE INTERESTED',
    'Hi all, I’m looking to sell my tickets to the Sabrina Carpenter show on Saturday, November 9 at 7 PM at the Chase Center in San Francisco, CA. Sadly, I won’t be able to go. If you’re interested, shoot me a text at 806-329-0611.']
const decepticon = new Client({
    intents: [
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessageTyping
    ]
})
//console.log(process.env.TOKEN_2); //Only works in a node terminal, investigate more later
decepticon.login(process.env.TOKEN_2);
decepticon.on('ready', (c) => {
    console.log(`${c.user.tag} is ready to decieve`);
})
decepticon.on('messageCreate', msg => {
    if(!msg.author.bot) {
        msg.reply(scamList[Math.floor(Math.random() * 2)])
        console.log('Replied with scam');
    }
})
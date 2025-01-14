require('dotenv').config()
const {Client, IntentsBitField, Message} = require('discord.js')
const triggerWords = ['give away', 'dm me', 'giving away for free', 'macbook 2020', 'sell my tickets', 'sell']
const warden = new Client({
    intents: [
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers
    ]
})
warden.login(process.env.DISCORD_TOKEN);
warden.on('ready', (c) => {
    console.log(`${c.user.tag} is ready to rumble`);
    c.channels.cache.get(process.env.CHANNEL_ID).send('IRONHIDE: LOCKED AND LOADED');
})

warden.on('messageCreate', async (msg) => {
    const triggered = triggerWords.some(word => msg.content.toLowerCase().includes(word));
    const userTimeOnServer = convertMiliToDays(Date.now() - parseInt(msg.member.joinedTimestamp));
    console.log("Triggered: " + triggered);
    console.log("Days on Server:" + userTimeOnServer);
    if(triggered && userTimeOnServer < 30.0) {
        try {
            await msg.delete();
            await msg.guild.members.ban(msg.author, {reason : 'Soliciting on server'})
            await msg.channel.send(`${msg.author.username} deleted from server for: ${msg.guild.bans.fetch(msg.author.id).reason}`)
            console.log(`Bot banned for ${msg.guild.bans.fetch(msg.author.id).reason}`)
        } catch(error) {
            console.log(`Couldn\'t delete bot because of: ${error}`)
        }
    }
});

function convertMiliToDays(miliseconds) {
    return miliseconds / 1000 / 60 / 60 / 24;
}
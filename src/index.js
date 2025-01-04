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
})

warden.on('messageCreate', async (msg) => {
    const triggered = triggerWords.some(word => msg.content.toLowerCase().includes(word));
    const notABot = triggerWords.some(word => msg.content.toLowerCase().includes('i am not a bot'))
    console.log("Triggered: " + triggered);
    console.log("Not a bot: " + notABot);
    if(triggered && !notABot && msg.author.id != msg.guild.ownerId) {
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
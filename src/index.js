require('dotenv').config()
const {Client, IntentsBitField, Message, EmbedBuilder} = require('discord.js')
const triggerWords = ['give away', 'dm me', 'for free', 'macbook 2020', 'sell', 'giving away']
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
    var nickname = msg.member.nickname;
    if(triggered && userTimeOnServer < 100.0) {
        try {
            await msg.delete();
            await msg.guild.members.ban(msg.member, {reason: 'Soliciting on server'});
            if(nickname != null)
                await msg.channel.send(`${msg.member.nickname} deleted from server for: ${msg.guild.bans.fetch(msg.member.id).reason}`)
            else 
                await msg.channel.send(`Bot vaporized from server for soliciting!`);
            console.log(`Bot banned for ${msg.guild.bans.fetch(msg.member.id).reason}`);
        } catch(error) {
            console.log(`Couldn\'t delete bot because of: ${error}`);
        }
    }
});
warden.on('messageCreate', async (ping) => {
    if(ping.content.toLowerCase().startsWith('@ironhide')) {
        ping.reply('All\'s well for now! Here\'s a status report');
    }
});

function convertMiliToDays(miliseconds) {
    return miliseconds / 1000 / 60 / 60 / 24;
}
const {SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute (message, client) {
        
        async function sendMessage(msg) {
            const embed = new EmbedBuilder()
            .setColor("Greyple")
            .setTitle("Coast is clear")
            .setDescription("This is a sign that I'm still alive and kicking! Just @mention me again if you want to check!")
            .setTimestamp();

            if(!msg) {
                await message.reply({embeds: [embed]});
            } else {
                embed.setFooter({text: `Click below to delete message`})
                const button = new ActionRowBuilder() 
                .addComponents(new ButtonBuilder() 
                    .setCustomId('replymsgDelete')
                    .setLabel(`💥`) 
                    .setStyle(ButtonStyle.Danger));
                
                const message = await message.reply({embeds: [embed], components: [button]});
                const collector = await msg.createMessageComponentCollector();
                collector.on('collect', async i => {
                    if(i.customId == 'replymsgDelete') {
                        await msg.delete()
                    }
                }); 
            }

        }

        if(message.mentions.users.first() == client.user) {
            if(message.reference) {
                await sendMessage(true);
            }
            else {
                await sendMessage();
            }
        }
    }
}
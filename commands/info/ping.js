const { MessageEmbed } = require('discord.js');
const talkedRecently = new Set();

module.exports = {
    name: 'ping',
    category: 'info',
    description: 'returns bot and API latency in milliseconds',
    usage: `ping`,
    run: async (client, message) => {
        if (talkedRecently.has(message.author.id)) {
            const embed = new MessageEmbed()
                .setColor(process.env.COLOR)
                .setTitle('Please wait before using this command again!')

            message.channel.send({ embeds: [embed] }).then(msg => {
                message.delete()
                setTimeout(() => msg.delete(), 5000)
            }).catch(err => console.error(err));
        } else {
            const msg = await message.channel.send('🏓 Pinging...');

            const embed = new MessageEmbed()
                .setColor(process.env.COLOR)
                .setTitle('🏓 Pong!')
                .setDescription(`Bot Latency is **${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms** \nAPI Latency is **${Math.round(client.ws.ping)} ms**`)

            msg.edit({embeds: [embed]});

            talkedRecently.add(message.member.id);

            setTimeout(() => {
                talkedRecently.delete(message.member.id);
            }, 10000);
        }
    }
}
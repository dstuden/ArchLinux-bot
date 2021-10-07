const { MessageEmbed } = require('discord.js');

module.exports = function stop(message, serverQueue) {
    try {
        if (!message.member.voice.channel)
            return message.channel.send("You need to join the voice chat first!");

        serverQueue.looping = false;
        serverQueue.songs = [];
        message.guild.me.voice.channel.leave();

        const embed = new MessageEmbed()
            .setColor(process.env.COLOR)
            .setTitle(`✅  Disconected`)
        serverQueue.txtChannel.send(embed).then(m => m.delete({ timeout: 10000 })).catch(err => console.error(err));
    }
    catch (err) {
        console.log(err)
    }
}
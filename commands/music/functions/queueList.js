const { MessageEmbed } = require('discord.js');

module.exports = function queueList(message, serverQueue, queueIndex) {
    try {
        if (!message.member.voice.channel) return message.channel.send("You need to join the voice chat first");
        const tempIndex = queueIndex;
        let extra = serverQueue.songs.length - (queueIndex+1);

        const embed = new MessageEmbed()
            .setColor(process.env.COLOR)
            .setTitle('⏭️  Queue')

        for (let i = 0; (queueIndex < serverQueue.songs.length) && (queueIndex < 10); queueIndex++) {
            embed.addField('‏‏‎ ‎', `${i + 1}. [${serverQueue.songs[queueIndex].title}](${serverQueue.songs[queueIndex].url})`);
            i++;
        }

        message.channel.send(embed).then(m => m.delete({ timeout: 60000 })).catch(err => console.error(err));
        queueIndex = tempIndex;
    }
    catch (err) {
        console.log(err)
    }
}

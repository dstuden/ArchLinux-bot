const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
    name: 'defaultrole',
    category: 'moderation',
    description: 'sets the server default role. you have to use an id of a role with lower permission level than the bot',
    usage: `defaultrole`,
    run: async (client, message) => {

        if (message.member.hasPermission("MANAGE_ROLES")) {

            const newRole = message.content.split(' ');

            const settings = await Guild.findOne({
                guildID: message.guild.id
            }).catch(err => {
                console.log(err)
            });

            if (settings == null) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX,
                    defaultRole: ''
                })

                newGuild.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));

                const embed = new MessageEmbed()
                    .setColor(process.env.COLOR)
                    .setTitle('This server was not in my database! You can now use commands!')
                    .setFooter('PogWorks Studios ©️ 2021')

                return message.channel.send(embed).then(m => m.delete({ timeout: 10000 })).catch(err => console.error(err));
            } else {
            }
            const defaultRole = settings.defaultRole;

            if (typeof newRole[1] === 'undefined') {
                const embed = new MessageEmbed()
                    .setColor(process.env.COLOR)
                    .setTitle('Enter a role id!')
                    .setFooter('PogWorks Studios ©️ 2021')

                return message.channel.send(embed).then(m => m.delete({ timeout: 10000 })).catch(err => console.error(err));

            }
            else {
                if (message.guild.roles.cache.find(role => role.id == newRole[1])) {
                    await settings.updateOne({
                        defaultRole: newRole[1]
                    });

                    const embed = new MessageEmbed()
                        .setColor(process.env.COLOR)
                        .setTitle('The new default role for this server is ' + newRole[1])
                        .setFooter('PogWorks Studios ©️ 2021')

                    message.channel.send(embed).catch(err => console.error(err));
                } else {
                    const embed = new MessageEmbed()
                        .setColor(process.env.COLOR)
                        .setTitle('Enter a valid role id!')
                        .setFooter('PogWorks Studios ©️ 2021')

                    return message.channel.send(embed).then(m => m.delete({ timeout: 10000 })).catch(err => console.error(err));
                }
            }

        } else {
            const embed = new MessageEmbed()
                .setColor(process.env.COLOR)
                .setTitle('You dont have the permissions to do that!')
                .setFooter('PogWorks Studios ©️ 2021')

            message.channel.send(embed).then(m => m.delete({ timeout: 10000 })).catch(err => console.error(err));
        }


    }
}


const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "userinfo",

  aliases: [
    "userinfo",
    "user info",
    "my info",
    "who am i",
    "about me"
  ],

  async execute(message) {

    // Ignore bot mention, use mentioned user if available
    const member =
      message.mentions.members
        .filter(m => m.id !== message.client.user.id)
        .first() || message.member;

    const user = member.user;

    const roles = member.roles.cache
      .filter(role => role.name !== "@everyone")
      .sort((a, b) => b.position - a.position)
      .map(role => role.toString());

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)

      .setAuthor({
        name: `${user.username}`,
        iconURL: user.displayAvatarURL({ dynamic: true })
      })

      .setThumbnail(
        user.displayAvatarURL({
          dynamic: true,
          size: 1024
        })
      )

      .addFields(
        {
          name: "👤 Username",
          value: user.username,
          inline: true
        },
        {
          name: "🏷️ Display Name",
          value: member.displayName,
          inline: true
        },
        {
          name: "🆔 User ID",
          value: user.id,
          inline: false
        },
        {
          name: "📅 Joined Server",
          value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`,
          inline: false
        },
        {
          name: "📆 Discord Created",
          value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`,
          inline: false
        },
        {
          name: `🎭 Roles (${roles.length})`,
          value: roles.length
            ? roles.join(" ")
            : "No Roles",
          inline: false
        }
      )

      .setFooter({
        text: "Darkula Assistant • Created by xzhDark"
      })

      .setTimestamp();

    return message.reply({
      embeds: [embed]
    });
  }
};

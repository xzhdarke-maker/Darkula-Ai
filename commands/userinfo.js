const {
  EmbedBuilder
} = require("discord.js");

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

    const member =
      message.mentions.members.first() ||
      message.member;

    const user = member.user;

    const roles = member.roles.cache
      .filter(r => r.name !== "@everyone")
      .sort((a, b) => b.position - a.position)
      .map(r => r.toString());

    const embed = new EmbedBuilder()

      .setColor("#5865F2")

      .setAuthor({
        name: `${user.username}`,
        iconURL: user.displayAvatarURL()
      })

      .setThumbnail(
        user.displayAvatarURL({
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
          name: "🏷 Display Name",
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
          name: "📆 Discord Account Created",
          value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`,
          inline: false
        },
        {
          name: `🎭 Roles (${roles.length})`,
          value:
            roles.length
              ? roles.join(" ")
              : "No Roles",
          inline: false
        }
      )

      .setFooter({
        text:
          "Darkula Assistant • Created by xzhDark"
      })

      .setTimestamp();

    return message.reply({
      embeds: [embed]
    });

  }
};

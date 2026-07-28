module.exports = {
  name: "userinfo",

  aliases: [
    "my info",
    "who am i",
    "about me"
  ],

  async execute(message) {
    const member = message.member;
    const user = message.author;

    const roles = member.roles.cache
      .filter(role => role.name !== "@everyone")
      .map(role => role.name)
      .join(", ");

    return message.reply({
      content:
`👤 Username: ${user.username}
🏷️ Display Name: ${member.displayName}
🎭 Roles: ${roles || "None"}
📅 Joined Date: <t:${Math.floor(member.joinedTimestamp / 1000)}:F>`
    });
  }
};

const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = async (message) => {

  const row = new ActionRowBuilder().addComponents(

    new ButtonBuilder()
      .setCustomId("xzh_claim")
      .setLabel("📌 Claim Application")
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId("xzh_accept")
      .setLabel("✅ Accept")
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId("xzh_reject")
      .setLabel("❌ Reject")
      .setStyle(ButtonStyle.Danger)

  );

  return await message.channel.send({
    content:
`## 👑 xzhGang Review Panel

Only authorized Staff members can review this application.

Please claim the application before reviewing.`,
    components: [row],
  });

};

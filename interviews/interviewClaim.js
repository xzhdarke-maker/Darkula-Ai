const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = async (message) => {

  const row = new ActionRowBuilder().addComponents(

    new ButtonBuilder()
      .setCustomId("staff_claim")
      .setLabel("📌 Claim Interview")
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId("staff_accept")
      .setLabel("✅ Accept")
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId("staff_reject")
      .setLabel("❌ Reject")
      .setStyle(ButtonStyle.Danger)

  );

  return await message.channel.send({
    content:
`## 👮 Staff Review Panel

Only authorized Staff members can review this application.

Please claim the interview before reviewing.`,
    components: [row],
  });

};

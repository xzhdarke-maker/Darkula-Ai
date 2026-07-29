const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");

const config = require("../config");

module.exports = async (interaction) => {
  if (!interaction.isButton()) return;

  if (
    interaction.customId !== "staff_accept" &&
    interaction.customId !== "staff_reject"
  ) {
    return;
  }

  const member = interaction.member;

  const allowedRoles = [
    config.roles.ticketSupport,
    config.roles.leader,
    config.roles.authority,
    config.roles.operatorzz,
    config.roles.feelThePower,
    config.roles.coOwner,
  ];

  const hasPermission =
    member.permissions.has(PermissionFlagsBits.Administrator) ||
    member.roles.cache.some(role =>
      allowedRoles.includes(role.id)
    );

  if (!hasPermission) {
    return interaction.reply({
      content: "❌ You don't have permission to review Staff Applications.",
      ephemeral: true,
    });
  }

  const accepted = interaction.customId === "staff_accept";

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("review_done")
      .setLabel(
        accepted
          ? `✅ Accepted by ${interaction.user.username}`
          : `❌ Rejected by ${interaction.user.username}`
      )
      .setStyle(
        accepted
          ? ButtonStyle.Success
          : ButtonStyle.Danger
      )
      .setDisabled(true)
  );

  await interaction.update({
    components: [row],
  });

  await interaction.followUp({
    content: accepted
      ? `✅ Application approved by ${interaction.user}.`
      : `❌ Application rejected by ${interaction.user}.`,
  });
};

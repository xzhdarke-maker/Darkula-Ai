const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");

const config = require("../config");
const staffInterview = require("../interviews/staffInterview");

module.exports = async (interaction) => {
  if (!interaction.isButton()) return;

  if (
  interaction.customId !== "staff_claim" &&
  interaction.customId !== "staff_unclaim" &&
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
  member.id === config.users.owner ||
  member.id === config.users.girlsOwner ||
  member.roles.cache.some(role =>
    allowedRoles.includes(role.id)
  );

  if (!hasPermission) {
    return interaction.reply({
      content: "❌ You don't have permission to review Staff Applications.",
      ephemeral: true,
    });
  }
if (interaction.customId === "staff_claim") {

  const interview = staffInterview.findByChannel(
    interaction.channel.id
  );

  if (!interview) {
    return interaction.reply({
      content: "❌ No active interview found.",
      ephemeral: true,
    });
  }

  staffInterview.pause(
    interview.userId,
    interaction.user.id
  );

  await interaction.reply({
    content:
`📌 Interview Claimed by ${interaction.user}

🤖 Darkula AI Interview has been paused.`,
  });

  return;
}

if (interaction.customId === "staff_unclaim") {

  await interaction.reply({
    content:
      `🔓 Interview Resumed by ${interaction.user}.\n\n🤖 Darkula AI Interview has been resumed.`,
  });

  return;
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

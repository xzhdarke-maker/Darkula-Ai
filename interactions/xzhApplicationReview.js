const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");

const config = require("../config");
const xzhInterview = require("../interviews/xzhInterview");

module.exports = async (interaction) => {

  const client = interaction.client;

  if (!interaction.isButton()) return;

  if (
    interaction.customId !== "xzh_claim" &&
    interaction.customId !== "xzh_unclaim" &&
    interaction.customId !== "xzh_accept" &&
    interaction.customId !== "xzh_reject"
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
      content:
        "❌ You don't have permission to review xzhGang Applications.",
      ephemeral: true,
    });
  }

  const interview = xzhInterview.findByChannel(
    interaction.channel.id
  );

  if (!interview) {
    return interaction.reply({
      content: "❌ No active interview found.",
      ephemeral: true,
    });
  }

  const isOwner =
    interaction.user.id === config.users.owner;

  const isGirlsOwner =
    interaction.user.id === config.users.girlsOwner;

  if (
    interview.data.claimedBy &&
    interview.data.claimedBy !== interaction.user.id &&
    !isOwner &&
    !isGirlsOwner
  ) {
    return interaction.reply({
      content:
`❌ This application has already been claimed by <@${interview.data.claimedBy}>.

Only the claimed staff member can review it.`,
      ephemeral: true,
    });
  }

  /* ==========================
         CLAIM APPLICATION
  ========================== */
    if (interaction.customId === "xzh_claim") {

    xzhInterview.pause(
      interview.userId,
      interaction.user.id
    );

    const row = new ActionRowBuilder().addComponents(

      new ButtonBuilder()
        .setCustomId("xzh_unclaim")
        .setLabel("🔓 Unclaim Application")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("xzh_accept")
        .setLabel("✅ Accept")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId("xzh_reject")
        .setLabel("❌ Reject")
        .setStyle(ButtonStyle.Danger)

    );

    await interaction.update({
      components: [row],
    });

    await interaction.followUp({
      content:
`📌 **Application Claimed**

👑 Claimed By: ${interaction.user}

🤖 Darkula AI Application has been paused.`,
    });

    return;
  }

  /* ==========================
        UNCLAIM APPLICATION
  ========================== */

  if (interaction.customId === "xzh_unclaim") {

    xzhInterview.resume(interview.userId);

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

    await interaction.update({
      components: [row],
    });

    await interaction.followUp({
      content:
`🔓 **Application Resumed**

👑 Resumed By: ${interaction.user}

🤖 Darkula AI Application has been resumed.`,
    });

    return;
  }

  /* ==========================
          ACCEPT / REJECT
  ========================== */

  const accepted =
    interaction.customId === "xzh_accept";

  const applicant =
    await client.users.fetch(interview.userId).catch(() => null);

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
  if (applicant) {
    try {
      await applicant.send({
        content: accepted
          ? `👑 Congratulations!

Your **xzhGang Application** has been **Accepted**!

A Leader or Owner will contact you shortly.

Server:
${config.server.invite}`
          : `Hello!

Unfortunately your **xzhGang Application** has been **Rejected** this time.

You can always apply again in the future.

Server:
${config.server.invite}`,
      });
    } catch {}
  }

  await interaction.followUp({
    content: accepted
      ? `✅ ${interaction.user} accepted this xzhGang Application.`
      : `❌ ${interaction.user} rejected this xzhGang Application.`,
  });

  try {

    const logChannel = client.channels.cache.get(
      config.channels.interviewLogs
    );

    if (logChannel) {

      const messages = await logChannel.messages.fetch({
        limit: 20,
      });

      const logMessage = messages.find(
        (m) =>
          m.embeds.length &&
          m.embeds[0].footer &&
          m.embeds[0].footer.text &&
          m.embeds[0].footer.text.includes(interview.userId)
      );

      if (logMessage) {

        const embed = logMessage.embeds[0];

        const fields = [...embed.fields];

        fields.push({
          name: "📋 Status",
          value: accepted
            ? "🟢 Accepted"
            : "🔴 Rejected",
          inline: true,
        });

        fields.push({
          name: "👑 Reviewed By",
          value: `${interaction.user}`,
          inline: true,
        });

        await logMessage.edit({
          embeds: [
            {
              ...embed.data,
              fields,
            },
          ],
        });

      }

    }

  } catch (err) {
    console.error(err);
  }

  xzhInterview.remove(interview.userId);

};

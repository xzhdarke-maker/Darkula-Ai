const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const config = require("../config");

module.exports = async (client, message, answers) => {
  const logChannel = client.channels.cache.get(
    config.channels.interviewLogs
  );

  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setColor("#5865F2")
    .setTitle("📝 New Staff Application")
    .setDescription(
      "A new Staff Apply interview has been completed."
    )
    .addFields(
      {
        name: "👤 Applicant",
        value: `${message.author} (${message.author.tag})`,
      },
      {
        name: "🎫 Ticket",
        value: `${message.channel}`,
      },
      {
        name: "1️⃣ Name / Nickname",
        value: answers[0] || "Not answered",
      },
      {
        name: "2️⃣ Age",
        value: answers[1] || "Not answered",
      },
      {
        name: "3️⃣ Country",
        value: answers[2] || "Not answered",
      },
      {
        name: "4️⃣ Timezone",
        value: answers[3] || "Not answered",
      },
      {
        name: "5️⃣ Daily Activity",
        value: answers[4] || "Not answered",
      },
      {
        name: "6️⃣ Previous Experience",
        value: answers[5] || "Not answered",
      },
      {
        name: "7️⃣ Why Join?",
        value: answers[6] || "Not answered",
      },
      {
        name: "8️⃣ Why Should We Choose You?",
        value: answers[7] || "Not answered",
      },
      {
        name: "9️⃣ Rules Accepted?",
        value: answers[8] || "Not answered",
      }
    )
    .setThumbnail(message.author.displayAvatarURL())
    .setFooter({
      text: `User ID: ${message.author.id}`,
    })
    .setTimestamp();

  const buttons = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("staff_accept")
      .setLabel("✅ Accept")
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId("staff_reject")
      .setLabel("❌ Reject")
      .setStyle(ButtonStyle.Danger)
  );

  await logChannel.send({
    embeds: [embed],
    components: [buttons],
  });
};

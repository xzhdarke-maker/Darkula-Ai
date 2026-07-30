const {
  EmbedBuilder,
} = require("discord.js");

const config = require("../config");

module.exports = async (client, message, answers) => {
  const logChannel = client.channels.cache.get(
    config.channels.interviewLogs
  );

  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setColor("#9B59B6")
    .setTitle("👑 New xzhGang Application")
    .setDescription(
      "A new xzhGang Apply interview has been completed."
    )
    .addFields(
      {
        name: "📊 Status",
        value: "🟡 Pending Review",
        inline: true,
      },
      {
        name: "👮 Claimed By",
        value: "Not Claimed",
        inline: true,
      },
      {
        name: "👤 Applicant",
        value: `${message.author} (${message.author.tag})`,
      },
      {
        name: "🆔 Applicant ID",
        value: message.author.id,
        inline: false,
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
        name: "3️⃣ Why do you want to join xzhGang?",
        value: answers[2] || "Not answered",
      },
      {
        name: "4️⃣ Requirements Accepted?",
        value: answers[3] || "Not answered",
      },
      {
        name: "5️⃣ Loyalty Promise",
        value: answers[4] || "Not answered",
      }
    )
    .setThumbnail(message.author.displayAvatarURL())
    .setFooter({
      text: `User ID: ${message.author.id}`,
    })
    .setTimestamp();

  const logMessage = await logChannel.send({
    embeds: [embed],
  });

  return logMessage;
};

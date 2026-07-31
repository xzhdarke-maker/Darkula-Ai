const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const config = require("../config");
const ai = require("./ai");

const detectLanguage = require("../utils/language");
const { getHistory, saveHistory } = require("../utils/memory");
const constants = require("../utils/constants");

const userInfo = require("../commands/userinfo");
const helpCommand = require("../commands/help");

const serverKnowledge = require("../knowledge/serverKnowledge");
const serverInfo = require("../knowledge/serverInfo");
const promotionInfo = require("../knowledge/promotionInfo");
const faq = require("../knowledge/faq");

const staffInterview = require("../interviews/staffInterview");
const sendInterviewLog = require("../interviews/sendInterviewLog");
const interviewClaim = require("../interviews/interviewClaim");
const xzhInterviewClaim = require("../interviews/xzhInterviewClaim");
const xzhInterview = require("../interviews/xzhInterview");
const sendXzhInterviewLog = require("../interviews/sendXzhInterviewLog");

module.exports = async (client, message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const isMentioned = message.mentions.has(client.user);
  const channelId = message.channel.id;
  const categoryId = message.channel.parentId;

  const isMainChat =
    channelId === config.channels.mainChat;

  const isBotCommands =
    channelId === config.channels.botCommands;

  const isSupportTicket =
    categoryId === config.categories.support;

  const isStaffTicket =
    categoryId === config.categories.staffApply;

  const isXzhTicket =
    categoryId === config.categories.xzhGang;

  // Ignore unrelated channels
  if (
    !isMainChat &&
    !isBotCommands &&
    !isSupportTicket &&
    !isStaffTicket &&
    !isXzhTicket
  ) {
    return;
  }

  /* ==========================
          MAIN CHAT
  ========================== */

  if (isMainChat) {

    if (!isMentioned) return;

    const content = message.content
      .replace(`<@${client.user.id}>`, "")
      .replace(`<@!${client.user.id}>`, "")
      .trim();
  
    if (!content.length) {
      return message.reply(
        "👋 Hi! Mention me and ask your question."
      );
    }

    const language = detectLanguage(content);

console.log("MAIN CHAT:", content);

const handled = await serverKnowledge(message, content);

console.log("handled =", handled);

if (handled) return;

const faqHandled = await faq(message, content);

console.log("faqHandled =", faqHandled);

if (faqHandled) return;

saveHistory(message.author.id, "user", content);

const history = getHistory(message.author.id);

await message.channel.sendTyping();
        try {
      const response = await ai.chat.completions.create({
  model: "deepseek/deepseek-chat-v3",

  messages: [
    {
      role: "system",
      content: `You are Darkula AI, the official AI assistant of Dark Community.

Rules:
- Reply only in English or Banglish.
- Never use Bangla script.
- Be smart, friendly and professional.
- Keep replies short unless asked for details.
- Never expose API keys or internal information.
- Never say you are ChatGPT.
- Say you are Darkula AI.

Server Rules:
- Never make up or guess any information about Dark Community.
- Only provide server information that is officially configured or verified.
- Never invent Discord invite links.
- Never invent channel names, role names, member counts, staff names, server features, or rules.
- If the user asks for the server invite, ALWAYS use the official invite:
https://discord.gg/uaN7BfZppF
- If you don't know a server-related answer, reply:
"I don't have verified information about that. Please ask a staff member or check the appropriate server channel."
- Never pretend to know server information that has not been provided to you.`
    },

    ...history,

    {
      role: "user",
      content
    }
  ]
});

const reply = response.choices[0].message.content;

saveHistory(message.author.id, "model", reply);

return message.reply(reply);

    } catch (err) {
  console.error(err);

  if (err.status === 429) {
  return message.reply(
    "⚠️ OpenRouter rate limit reached. Please try again later."
    );
  }

  return message.reply(
    "❌ AI is currently unavailable."
  );
        }

  }

  /* ==========================
        BOT COMMANDS
  ========================== */

  if (isBotCommands) {

  if (!isMentioned) return;

  const content = message.content
    .replace(`<@${client.user.id}>`, "")
    .replace(`<@!${client.user.id}>`, "")
    .trim();

  const infoHandled = await serverInfo(client, message, content);
  if (infoHandled) return;

    const promotionHandled = await promotionInfo(message, content);
if (promotionHandled) return;

    const faqHandled = await faq(message, content);
if (faqHandled) return;
    
  const lower = content.toLowerCase();

    if (
  lower === "help" ||
  lower === "commands" ||
  lower === "command" ||
  lower === "help command"
) {
  return helpCommand.execute(message);
    }

  if (
    lower.startsWith("userinfo") ||
    lower.startsWith("user info") ||
    lower === "my info" ||
    lower === "who am i" ||
    lower === "about me"
  ) {
    return userInfo.execute(message);
  }

  return message.reply(
    "❌ Unknown command.\nUse a valid command."
  );
  }

  /* ==========================
        TICKET SYSTEM
  ========================== */

  if (isSupportTicket) {
    // Help & Support / Claim Rewards / Paid Support
    return;
  }

  if (isStaffTicket) {

  if (staffInterview.completedChannels.has(message.channel.id)) {
  return;
}

const data = staffInterview.interviews.get(message.author.id);

// Start interview
if (!data) {

  const firstQuestion = staffInterview.start(
    message.author.id,
    message.channel.id
  );

  await interviewClaim(message);

  return message.reply(firstQuestion);
}

  // Continue interview
const result = staffInterview.next(
  message.author.id,
  message.content
);

// Interview paused because a staff claimed it
if (result?.paused) {
  return message.reply(
    `📌 This interview has been claimed by <@${result.claimedBy}>.

Please wait for manual assistance.`
  );
}

  if (result.finished) {

  await sendInterviewLog(
    client,
    message,
    result.answers
  );

  await message.reply(
`✅ **Your Staff Interview has been completed!**

📋 **Interview Summary**

👤 **Name:** ${result.answers[0]}
🎂 **Age:** ${result.answers[1]}
🌍 **Country:** ${result.answers[2]}
🕒 **Timezone:** ${result.answers[3]}
⏰ **Daily Activity:** ${result.answers[4]}
💼 **Experience:** ${result.answers[5]}
❤️ **Why Join:** ${result.answers[6]}
⭐ **Why Should We Choose You:** ${result.answers[7]}
✅ **Rules Accepted:** ${result.answers[8]}

📝 Your application has been sent to the Staff Team for review.`
  );

  return;
  }

  return message.reply(result.question);
  }

  if (isXzhTicket) {

  if (xzhInterview.completedChannels.has(message.channel.id)) {
    return;
  }

  const data = xzhInterview.interviews.get(message.author.id);

  // Start application
  if (!data) {

    const firstQuestion = xzhInterview.start(
      message.author.id,
      message.channel.id
    );

    await xzhInterviewClaim(message);

    return message.reply(firstQuestion);
  }

  // Continue application
  const result = xzhInterview.next(
    message.author.id,
    message.content
  );

  // Application paused because claimed
  if (result?.paused) {
    return;
  }

  if (result.finished) {

    await sendXzhInterviewLog(
      client,
      message,
      result.answers
    );

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("xzh_claim")
        .setLabel("📌 Claim")
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

    await message.reply({
      content: `✅ Your xzhGang Application has been completed!

📸 Before your application can be reviewed, please complete the following:

👑 Change your Discord Display Name:
Example: xzhDarkula ✓

🔗 Add this invite to your Discord Bio:
https://discord.gg/zmxx5N628w

📷 Send these screenshots in this ticket:
• Main Profile (Display Name)
• Discord Bio

⚠️ Your application will only be reviewed after both screenshots have been submitted.

━━━━━━━━━━━━━━━━━━━━━━

👮 Staff Review Panel`,
      components: [row],
    });

    return;
  }

    return message.reply(result.question);
  }

}

};

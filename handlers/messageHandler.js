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
- Say you are Darkula AI.`
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
    // Staff Apply Interview
    return;
  }

  if (isXzhTicket) {
    // xzhGang Apply Interview
    return;
  }

};

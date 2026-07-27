const config = require("../config");
const ai = require("./ai");

const detectLanguage = require("../utils/language");
const { getHistory, saveHistory } = require("../utils/memory");
const constants = require("../utils/constants");
module.exports = async (client, message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const isMentioned = message.mentions.has(client.user);
  const channelId = message.channel.id;

  const isMainChat =
    channelId === config.channels.mainChat;

  const isBotCommands =
    channelId === config.channels.botCommands;

  const categoryId = message.channel.parentId;

  const isSupportTicket =
    categoryId === config.categories.support;

  const isStaffTicket =
    categoryId === config.categories.staffApply;

  const isXzhTicket =
    categoryId === config.categories.xzhGang;

  // Ignore everything except:
  // Main Chat
  // Bot Commands
  // Ticket Categories

  if (
    !isMainChat &&
    !isBotCommands &&
    !isSupportTicket &&
    !isStaffTicket &&
    !isXzhTicket
  ) {
    return;
  }

  // Main Chat
  if (isMainChat) {

    // Must mention the bot
    if (!isMentioned) return;

    // Remove bot mention
    const content = message.content
      .replace(`<@${client.user.id}>`, "")
      .replace(`<@!${client.user.id}>`, "")
      .trim();

    if (!content.length) {
      return message.reply(
        "👋 Hi! Ask me something after mentioning me."
      );
    }

    const language = detectLanguage(content);

const history = getHistory(message.author.id);

history.push({
  role: "user",
  content,
});

if (history.length > constants.MAX_HISTORY) {
  history.shift();
}

await message.channel.sendTyping();

// AI response will be added in Part 2.2
  }

  // Bot Commands
  if (isBotCommands) {

    if (!isMentioned) return;

    return message.reply(
  `⚙️ This feature is only available in <#${config.channels.botCommands}>.`
);
  }

  // Ticket System
  if (
    isSupportTicket ||
    isStaffTicket ||
    isXzhTicket
  ) {

    // Interview system will be added later.
return;
  }
};

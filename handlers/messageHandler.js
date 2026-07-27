const config = require("../config");
const ai = require("./ai");

const conversations = new Map();
const MAX_HISTORY = 20;

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

    // Continue...
  }

  // Bot Commands
  if (isBotCommands) {

    if (!isMentioned) return;

    // Continue...
  }

  // Ticket System
  if (
    isSupportTicket ||
    isStaffTicket ||
    isXzhTicket
  ) {

    // Continue...
  }
};

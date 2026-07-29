const config = require("../config");

module.exports = async (client, message, content) => {
  const lower = content.toLowerCase().trim();

  /* ==========================
          SERVER INFO
  ========================== */

  if (
    lower.includes("server info") ||
    lower.includes("serverinfo") ||
    lower === "server" ||
    lower.includes("about server")
  ) {
    await message.reply(
`🏰 **Dark Community**

🆔 **Server ID**
${config.server.id}

👑 **Owner**
<@${config.users.owner}>

👑 **Girls Owner**
<@${config.users.girlsOwner}>

🔗 **Server Invite**
${config.server.invite}`
    );
    return true;
  }

  /* ==========================
          SERVER ID
  ========================== */

  if (
    lower.includes("server id") ||
    lower.includes("guild id")
  ) {
    await message.reply(
      `🆔 **Server ID**\n${config.server.id}`
    );
    return true;
  }

  /* ==========================
          OWNER
  ========================== */

  if (
    lower.includes("owner") &&
    !lower.includes("girls")
  ) {
    await message.reply(
      `👑 **Server Owner**\n<@${config.users.owner}>`
    );
    return true;
  }

  /* ==========================
        GIRLS OWNER
  ========================== */

  if (
    lower.includes("girls owner") ||
    lower.includes("girl owner")
  ) {
    await message.reply(
      `👑 **Girls Owner**\n<@${config.users.girlsOwner}>`
    );
    return true;
  }

  /* ==========================
          INVITE
  ========================== */

  if (
    lower.includes("invite") ||
    lower.includes("join")
  ) {
    await message.reply(
      `🔗 **Dark Community Invite**\n${config.server.invite}`
    );
    return true;
  }

  return false;
};

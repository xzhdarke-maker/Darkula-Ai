const config = require("../config");

module.exports = async (client, message, content) => {
  const lower = content.toLowerCase();

  /* ==========================
          SERVER INFO
  ========================== */

  if (
    lower === "server info" ||
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
    lower === "server id" ||
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
    lower === "owner" ||
    lower === "server owner"
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
    lower === "girls owner" ||
    lower === "girl owner"
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
    lower === "invite" ||
    lower === "server invite" ||
    lower === "join"
  ) {
    await message.reply(
      `🔗 **Dark Community Invite**\n${config.server.invite}`
    );

    return true;
  }

  return false;
};

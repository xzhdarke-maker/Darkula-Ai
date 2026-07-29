const config = require("../config");

module.exports = async (message, content) => {
  const lower = content.toLowerCase();
  /* ==========================
      BOT COMMAND REDIRECT
========================== */

if (
  lower.includes("server info") ||
  lower.includes("serverinfo") ||
  lower.includes("server id")
) {
  await message.reply(
    `📋 Please use <#${config.channels.botCommands}> for server commands.\n\n🤖 Main Chat is reserved for AI conversations.`
  );

  return true;
}

  /* ==========================
        ANNOUNCEMENT
  ========================== */

  if (
    lower.includes("announcement") ||
    lower.includes("announcements") ||
    lower.includes("news")
  ) {
    await message.reply(
      `📢 **Announcement Channel**\n<#${config.channels.announcement}>`
    );
    return true;
  }

  /* ==========================
            RULES
  ========================== */

  if (
    lower.includes("rules") ||
    lower.includes("rule")
  ) {
    await message.reply(
      `📜 **Rules Channel**\n<#${config.channels.rules}>`
    );
    return true;
  }

  /* ==========================
        VERIFICATION
  ========================== */

  if (
    lower.includes("verification") ||
    lower.includes("verify")
  ) {
    await message.reply(
      `✅ **Verification Channel**\n<#${config.channels.verification}>`
    );
    return true;
  }

  /* ==========================
          SELF ROLE
  ========================== */

  if (
    lower.includes("self role") ||
    lower.includes("selfrole")
  ) {
    await message.reply(
      `🎭 **Self Role Channel**\n<#${config.channels.selfRole}>`
    );
    return true;
  }

  /* ==========================
         RANK CHECK
  ========================== */

  if (
    lower.includes("rank") ||
    lower.includes("rank check")
  ) {
    await message.reply(
      `📈 **Rank Check Channel**\n<#${config.channels.rankCheck}>`
    );
    return true;
  }

  /* ==========================
        INVITE CHECK
  ========================== */

  if (
    lower.includes("invite") &&
    !lower.includes("reward")
  ) {
    await message.reply(
      `📨 **Invite Check Channel**\n<#${config.channels.inviteCheck}>`
    );
    return true;
  }

  /* ==========================
       INVITE REWARDS
  ========================== */

  if (
    lower.includes("invite reward") ||
    lower.includes("invite rewards") ||
    lower.includes("reward")
  ) {
    await message.reply(
      `🎁 **Invite Rewards Channel**\n<#${config.channels.inviteRewards}>`
    );
    return true;
  }
    /* ==========================
        HELP & SUPPORT
  ========================== */

  if (
    lower.includes("help") ||
    lower.includes("support")
  ) {
    await message.reply(
      `🆘 **Help & Support Channel**\n<#${config.channels.helpSupport}>`
    );
    return true;
  }

  /* ==========================
        STAFF APPLY
  ========================== */

  if (
    lower.includes("staff apply") ||
    lower.includes("staff application")
  ) {
    await message.reply(
      `👨‍💼 **Staff Apply Channel**\n<#${config.channels.staffApplyChannel}>`
    );
    return true;
  }

  /* ==========================
        XZHGANG APPLY
  ========================== */

  if (
    lower.includes("xzhgang apply") ||
    lower.includes("xzh apply") ||
    lower.includes("xzhgang")
  ) {
    await message.reply(
      `⚔️ **xzhGang Apply Channel**\n<#${config.channels.xzhGangApplyChannel}>`
    );
    return true;
  }

  // No server knowledge matched
  return false;
};

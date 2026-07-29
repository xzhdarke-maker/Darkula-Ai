module.exports = async (message, content) => {
  const lower = content.toLowerCase();

  // Owner
  if (
    lower.includes("owner") &&
    !lower.includes("girls owner") &&
    !lower.includes("co owner")
  ) {
    await message.reply(
      "👑 **Server Owner:** <@1307666797318766606>"
    );
    return true;
  }

  // Girls Owner
  if (
    lower.includes("girls owner") ||
    lower.includes("girl owner")
  ) {
    await message.reply(
      "🌸 **Girls Owner:** <@1426624569782964395>"
    );
    return true;
  }

  // Co Owner
  if (
    lower.includes("co owner") ||
    lower.includes("co-owner")
  ) {
    await message.reply(
      "👑 Co Owner information is available from the Staff Team."
    );
    return true;
  }

  // Authority
  if (lower.includes("authority")) {
    await message.reply(
      "🛡️ Authority is one of the highest staff ranks in Dark Community."
    );
    return true;
  }

  // Operator
  if (
    lower.includes("operator") ||
    lower.includes("operatorzz")
  ) {
    await message.reply(
      "⚡ OperatorzZ is a senior management role in Dark Community."
    );
    return true;
  }

  // Leader
  if (
    lower.includes("leader") ||
    lower.includes("leaderz")
  ) {
    await message.reply(
      "👥 Leaderz of Staff manages and supervises the Staff Team."
    );
    return true;
  }

  return false;
};

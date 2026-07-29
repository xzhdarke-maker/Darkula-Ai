module.exports = async (message, content) => {
  const lower = content.toLowerCase().trim();

  /* ==========================
        PROMOTION INFO
  ========================== */

  if (
    lower.includes("promotion") ||
    lower.includes("promotion info") ||
    lower.includes("promotion list") ||
    lower.includes("staff promotion")
  ) {
    await message.reply(
`📈 **Dark Community Staff Promotion**

1️⃣ Staff
2️⃣ Helper
3️⃣ Jr Power
4️⃣ High Power
5️⃣ Super Power
6️⃣ Ultra Power
7️⃣ Extreme Power
8️⃣ Rage Power
9️⃣ Master Power
🔟 Leaderz of Staff
1️⃣1️⃣ Authority
1️⃣2️⃣ OperatorzZ
1️⃣3️⃣ Feel the Power
1️⃣4️⃣ Co Ownz

📌 **Promotion Rules**
• Stay Active
• Help Members
• Follow Server Rules
• Respect Everyone
• Be Mature & Professional
• Invite Active Members
• No Promotion Begging
• Good Behavior & Positive Attitude
• Final Decision Depends on Staff`
    );

    return true;
  }

  return false;
};

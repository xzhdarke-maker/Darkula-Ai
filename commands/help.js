module.exports = {
  name: "help",

  async execute(message) {
    return message.reply(
`🤖 **Darkula Assistant**

📚 **Available Commands**

👤 **User Info**
• userinfo

🏰 **Server Info**
• server info

📈 **Promotion Info**
• promotion
• promotion info
• promotion list

📖 **Server Shortcuts**
• announcement
• rules
• verification
• self role
• rank check
• invite check
• invite rewards
• help & support
• staff apply
• xzhGang apply

💡 Please use <#1530546214146412574> for bot commands.`
    );
  },
};

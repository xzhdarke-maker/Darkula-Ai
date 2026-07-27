const messageHandler = require("../handlers/messageHandler");

module.exports = async (client, message) => {
  try {
    await messageHandler(client, message);
  } catch (err) {
    console.error("Message Handler Error:", err);
  }
};

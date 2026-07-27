const messageHandler = require("../handlers/messageHandler");

module.exports = async (client, message) => {
  await messageHandler(client, message);
};

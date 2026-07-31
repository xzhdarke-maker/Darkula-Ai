require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Partials,
} = require("discord.js");

const readyEvent = require("./events/ready");
const messageCreateEvent = require("./events/messageCreate");
const applicationReview = require("./interactions/applicationReview");
const xzhApplicationReview = require("./interactions/xzhApplicationReview");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.once("clientReady", () => {
  readyEvent(client);
});

client.on("messageCreate", async (message) => {
  await messageCreateEvent(client, message);
});

client.on("interactionCreate", async (interaction) => {
  await applicationReview(interaction);
  await xzhApplicationReview(interaction);
});

client.login(process.env.TOKEN);

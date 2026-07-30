require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Partials,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");

const { GoogleGenAI } = require("@google/genai");

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

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/* ===========================
          CHANNEL IDS
=========================== */

const BOT_COMMANDS_CHANNEL = "1530546214146412574";
const MAIN_CHAT_CHANNEL = "1401958567673725073";
const INTERVIEW_LOG_CHANNEL = "1531284574426890421";

/* ===========================
       TICKET CATEGORIES
=========================== */

const STAFF_CATEGORY = "1482161336317382657";
const XZH_CATEGORY = "1474327557955391538";
const SUPPORT_CATEGORY = "1401958509662310425";

/* ===========================
          USER IDS
=========================== */

const OWNER_ID = "1307666797318766606";
const GIRLS_OWNER_ID = "1426624569782964395";

/* ===========================
          ROLE IDS
=========================== */

const TICKET_SUPPORT_ROLE = "1401958484320452780";
const XZH_ROLE = "1458783248267087872";
const LEADER_ROLE = "1482331201242009651";
const AUTHORITY_ROLE = "1489926630007898184";
const OPERATOR_ROLE = "1489931575566139563";
const FEEL_POWER_ROLE = "1529086979134853140";
const CO_OWNER_ROLE = "1485651267039662181";

/* ===========================
        CONVERSATION MEMORY
=========================== */

const conversations = new Map();
const MAX_HISTORY = 20;

/* ===========================
      LANGUAGE DETECTION
=========================== */

function detectLanguage(text) {
  const banglaRegex = /[\u0980-\u09FF]/;

  if (banglaRegex.test(text)) {
    return "banglish";
  }

  const englishWords = [
    "hello",
    "hi",
    "help",
    "thanks",
    "owner",
    "server",
    "staff",
  ];

  const lower = text.toLowerCase();

  if (englishWords.some((w) => lower.includes(w))) {
    return "english";
  }

  return "banglish";
}

/* ===========================
          EVENTS
=========================== */

client.once("clientReady", () => {
  readyEvent(client);
});

client.on("messageCreate", async (message) => {
  await messageCreateEvent(client, message);
});

client.on("interactionCreate", async (interaction) => {
  await applicationReview(interaction);
});

client.login(process.env.TOKEN);

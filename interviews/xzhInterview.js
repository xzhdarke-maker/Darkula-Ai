const questions = [
  "👑 Welcome to the xzhGang Apply Interview!\n\n1️⃣ What is your real name or nickname?",

  "2️⃣ How old are you?",

  "3️⃣ Why do you want to join xzhGang?",

  `4️⃣ Before joining xzhGang, are you willing to complete all of these requirements?

✅ Change your Discord Display Name:
Example: xzhDarkula ✓

✅ Add this invite to your Discord Bio:
https://discord.gg/zmxx5N628w

📸 After completing them, you must send:
• Main Profile (Display Name) Screenshot
• Bio Screenshot`,

  "5️⃣ Do you promise to stay loyal to xzhGang, respect all members, and never damage the reputation of xzhGang or Dark Community?"
];

const interviews = new Map();
const completedChannels = new Set();

module.exports = {
  questions,
  interviews,
  completedChannels,

  start(userId, channelId) {
    interviews.set(userId, {
      step: 0,
      answers: [],
      channelId,

      paused: false,
      claimedBy: null,
    });

    return questions[0];
  },

  pause(userId, staffId) {
    const data = interviews.get(userId);
    if (!data) return false;

    data.paused = true;
    data.claimedBy = staffId;

    return true;
  },

  resume(userId) {
    const data = interviews.get(userId);
    if (!data) return false;

    data.paused = false;
    data.claimedBy = null;

    return true;
  },

  isPaused(userId) {
    const data = interviews.get(userId);
    if (!data) return false;

    return data.paused;
  },

  get(userId) {
    return interviews.get(userId);
  },

  next(userId, answer) {
    const data = interviews.get(userId);

    if (!data) return null;

    if (data.paused) {
      return {
        paused: true,
        claimedBy: data.claimedBy,
      };
    }

    data.answers.push(answer);
    data.step++;

    if (data.step >= questions.length) {

      completedChannels.add(data.channelId);

      data.finished = true;

      const answers = [...data.answers];

      return {
        finished: true,
        answers,
      };
    }

    return {
      finished: false,
      question: questions[data.step],
    };
  },

  findByChannel(channelId) {

    for (const [userId, data] of interviews.entries()) {

      if (data.channelId === channelId) {

        return {
          userId,
          data,
        };

      }

    }

    return null;
  },
};

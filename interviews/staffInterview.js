const questions = [
  "👋 Welcome to the Staff Apply Interview!\n\n1️⃣ What is your real name or nickname?",
  "2️⃣ How old are you?",
  "3️⃣ Which country are you from?",
  "4️⃣ What is your timezone?",
  "5️⃣ How many hours can you stay active daily?",
  "6️⃣ Do you have previous staff experience? If yes, explain.",
  "7️⃣ Why do you want to join the Dark Community Staff Team?",
  "8️⃣ Why should we choose you over other applicants?",
  "9️⃣ Are you able to follow all server rules and staff rules?"
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

      // V2
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

    // Stop interview while claimed
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

      const answers = [...data.answers];

      interviews.delete(userId);

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

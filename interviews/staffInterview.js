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

module.exports = {
  questions,
  interviews,

  start(userId) {
    interviews.set(userId, {
      step: 0,
      answers: []
    });

    return questions[0];
  },

  next(userId, answer) {
    const data = interviews.get(userId);
    if (!data) return null;

    data.answers.push(answer);
    data.step++;

    if (data.step >= questions.length) {
      interviews.delete(userId);

      return {
        finished: true,
        answers: data.answers
      };
    }

    return {
      finished: false,
      question: questions[data.step]
    };
  }
};

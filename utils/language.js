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

  if (englishWords.some(word => lower.includes(word))) {
    return "english";
  }

  return "banglish";
}

module.exports = detectLanguage;

const conversations = new Map();
const MAX_HISTORY = 20;

function getHistory(userId) {
  if (!conversations.has(userId)) {
    conversations.set(userId, []);
  }

  return conversations.get(userId);
}

function saveHistory(userId, role, content) {
  const history = getHistory(userId);

  history.push({
    role,
    content,
  });

  if (history.length > MAX_HISTORY) {
    history.splice(0, history.length - MAX_HISTORY);
  }
}

module.exports = {
  getHistory,
  saveHistory,
};

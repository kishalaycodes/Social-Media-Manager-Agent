const { calculateEngagement } = require("./engagementAgent");

function suggestBestPostingTime(posts) {
  if (!posts.length) return "18:00";

  const timeScores = {};

  posts.forEach(post => {
    const score = calculateEngagement(post);
    timeScores[post.time] = (timeScores[post.time] || 0) + score;
  });

  return Object.keys(timeScores).reduce((a, b) =>
    timeScores[a] > timeScores[b] ? a : b
  );
}

function autoSchedule(posts) {
  const bestTime = suggestBestPostingTime(posts);
  return bestTime;
}

module.exports = { suggestBestPostingTime, autoSchedule };

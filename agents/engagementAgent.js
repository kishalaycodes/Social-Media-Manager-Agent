function calculateEngagement(post) {
  const likes = Number(post.likes) || 0;
  const comments = Number(post.comments) || 0;
  const shares = Number(post.shares) || 0;

  return likes + 2 * comments + 3 * shares;
}

module.exports = { calculateEngagement };

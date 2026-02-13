const fs = require("fs");
const path = "./data/posts.json";

function updateEngagement(postId, likes, comments, shares) {
  const posts = JSON.parse(fs.readFileSync(path, "utf-8"));

  const post = posts.find(p => p.id === postId);
  if (!post) {
    return null;
  }

  post.likes = Number(likes);
  post.comments = Number(comments);
  post.shares = Number(shares);
  post.updatedAt = new Date().toISOString();

  fs.writeFileSync(path, JSON.stringify(posts, null, 2));
  return post;
}

module.exports = { updateEngagement };

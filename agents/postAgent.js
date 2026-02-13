// agents/postAgent.js

// 🔍 Validate duplicate topic and time
function validatePost(posts, topic, time) {
  // Check duplicate topic
  const duplicateTopic = posts.find(
    (p) => p.topic.toLowerCase() === topic.toLowerCase()
  );

  if (duplicateTopic) {
    return { error: "A post with the same topic already exists." };
  }

  // Check duplicate time
  const duplicateTime = posts.find(
    (p) => p.time === time
  );

  if (duplicateTime) {
    return { error: "Another post is already scheduled at this time." };
  }

  return null; // No validation errors
}


// 🧠 Create post object (pure logic)
function createPost(topic, time) {
  return {
    id: Date.now(),
    topic,
    time,
    likes: 0,
    comments: 0,
    shares: 0,
    createdAt: new Date().toISOString()
  };
}

module.exports = {
  validatePost,
  createPost
};

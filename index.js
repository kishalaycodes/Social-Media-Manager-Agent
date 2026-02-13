const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const { createPost, validatePost } = require("./agents/postAgent");
const { updateEngagement } = require("./agents/engagementUpdateAgent");
const { suggestBestPostingTime, autoSchedule } = require("./agents/schedulingAgent");
const { resolveTimeConflict } = require("./agents/conflictResolver");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, "data", "posts.json");

console.log("🚀 Social Media Manager API Running...");



function getPosts() {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify([]));
  }

  const data = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(data);
}

function savePosts(posts) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));
}




app.get("/api/posts", (req, res) => {
  const posts = getPosts();
  res.json(posts);
});

app.post("/api/posts", (req, res) => {
  try {
    const { topic, time, likes = 0, comments = 0, shares = 0 } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const posts = getPosts();

    let scheduledTime;

    let conflictDetected = false;

if (!time) {
  scheduledTime = autoSchedule(posts);
} else {
  const resolvedTime = resolveTimeConflict(time, posts);

  if (resolvedTime !== time) {
    conflictDetected = true;
  }

  scheduledTime = resolvedTime;
}


  
    const validationError = validatePost(posts, topic, scheduledTime);

    if (validationError) {
      return res.status(400).json(validationError);
    }


    const post = createPost(topic, scheduledTime);

 
    post.likes = likes;
    post.comments = comments;
    post.shares = shares;

    posts.push(post);

    savePosts(posts);

    const recommendedTime = suggestBestPostingTime(posts);

    res.json({
  message: "Post created successfully",
  post,
  scheduledTime,
  conflictDetected,
  originalTime: time,
  allPosts: posts
});


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
app.listen(3000, () => {
  console.log("🌍 Server running at http://localhost:3000");
});


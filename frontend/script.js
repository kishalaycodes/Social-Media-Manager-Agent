async function loadPosts() {
  try {
    const response = await fetch("http://localhost:3000/api/posts");
    const posts = await response.json();

    const container = document.getElementById("postsList");
    container.innerHTML = "";

    posts.forEach(post => {
      const div = document.createElement("div");
      div.className = "post-item";
      div.innerHTML = `
        <h4>${post.topic}</h4>
        <div class="meta">
          Time: ${post.time || "Immediate"} |
          👍 ${post.likes || 0} |
          💬 ${post.comments || 0} |
          🔁 ${post.shares || 0}
        </div>
      `;
      container.appendChild(div);
    });

  } catch (error) {
    console.error("Error loading posts:", error);
  }
}

async function createPost() {
  const topic = document.getElementById("topic").value;
  const time = document.getElementById("time").value;
  const likes = document.getElementById("likes").value;
  const comments = document.getElementById("comments").value;
  const shares = document.getElementById("shares").value;

  try {
    const response = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topic,
        time,
        likes,
        comments,
        shares
      })
    });

    const data = await response.json();

    if (!response.ok) {
      showMessage(data.error, "error");
      return;
    }

    if (data.conflictDetected) {
  showMessage(
    `Time conflict detected ⚠️ Post delayed to ${data.scheduledTime}`,
    "error"
  );
} else {
  showMessage("Post Scheduled Successfully ✅", "success");
}


    document.getElementById("topic").value = "";
    document.getElementById("time").value = "";
    document.getElementById("likes").value = "";
    document.getElementById("comments").value = "";
    document.getElementById("shares").value = "";

    loadPosts();

  } catch (error) {
    showMessage("Server not reachable 🚨", "error");
  }
}

function showMessage(message, type) {
  const box = document.getElementById("messageBox");

  box.innerText = message;
  box.style.display = "block";

  box.style.backgroundColor = type === "error" ? "#ff4d4d" : "#4CAF50";

  setTimeout(() => {
    box.style.display = "none";
  }, 3000);
}

window.onload = loadPosts;

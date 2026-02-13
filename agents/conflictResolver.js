function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function resolveTimeConflict(requestedTime, posts, buffer = 30) {
  let minutes = timeToMinutes(requestedTime);
  const occupied = posts.map(p => timeToMinutes(p.time));

  while (occupied.some(t => Math.abs(t - minutes) < buffer)) {
    minutes += buffer;
  }

  return minutesToTime(minutes);
}

module.exports = { resolveTimeConflict };

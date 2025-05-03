const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");
const emitter = new EventEmitter();

const filePath = path.join(__dirname, "eventCounts.json");

// Load existing event counts from file, or initialize if file doesn't exist
let eventCounts = {
  "user-login": 0,
  "user-logout": 0,
  "user-purchase": 0,
  "profile-update": 0,
};

if (fs.existsSync(filePath)) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    eventCounts = JSON.parse(data);
  } catch (err) {
    console.error("Error reading eventCounts.json:", err);
  }
}

// Helper function to save counts to file
function saveEventCounts() {
  try {
    fs.writeFileSync(filePath, JSON.stringify(eventCounts, null, 2));
  } catch (err) {
    console.error("Error writing to eventCounts.json:", err);
  }
}

// Event listeners
emitter.on("user-login", (username) => {
  console.log(`${username} logged in.!`);
  eventCounts["user-login"] += 1;
  saveEventCounts();
});

emitter.on("user-logout", (username) => {
  console.log(`${username} logged out.!`);
  eventCounts["user-logout"] += 1;
  saveEventCounts();
});

emitter.on("user-purchase", (username, item) => {
  console.log(`${username} purchased ${item}`);
  eventCounts["user-purchase"] += 1;
  saveEventCounts();
});

emitter.on("profile-update", (username, field) => {
  console.log(`${username} updated their ${field}`);
  eventCounts["profile-update"] += 1;
  saveEventCounts();
});

emitter.on("summary", () => {
  console.log("Event Summary:", eventCounts);
});

// Sample emissions
emitter.emit("user-login", "Thapa");
emitter.emit("user-logout", "Thapa");
emitter.emit("user-purchase", "Thapa", "Laptop");
emitter.emit("profile-update", "Thapa", "email");
emitter.emit("summary");
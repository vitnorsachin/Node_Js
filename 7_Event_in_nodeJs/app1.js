const EventEmitter = require("events");

// const emitter = new EventEmitter();
// emitter.on("greet", () => {
//   console.log("Hello Sachin Vitnor");
// });
// emitter.emit("greet");

// const emitter = new EventEmitter();
// emitter.on("greet", (username, prof) => {
//   console.log("Hello", username, "You are a", prof);
// });
// emitter.emit("greet", "Vitnor Sachin", "Mern Devloper");

const emitter = new EventEmitter();
emitter.on("greet", ({ name, prof }) => {
  console.log("Hello", name, "You are a", prof);
});
emitter.emit("greet", { name: "Vitnor Sachin", prof: "Mern Devloper" });
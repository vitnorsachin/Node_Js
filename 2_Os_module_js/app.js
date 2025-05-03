const os = require("os");

// console.log("Platform: ", os.platform());
// console.log("CPU Architecture: ", os.arch());
// console.log("Free Memory: ", os.freemem(), "bytes");
// console.log("Total Memory: ", os.totalmem(), "bytes");
// console.log("System Uptime: ", os.uptime(), "second");
// console.log("Home Directory: ", os.homedir());
// console.log("Host Name: ", os.hostname());
// console.log("Network Interfaces: ", os.networkInterfaces());
// console.log("CPU Info: ", os.cpus()[0]);

console.log("Temporary Directory: ", os.tmpdir())
console.log("Operating System: ", os.type())
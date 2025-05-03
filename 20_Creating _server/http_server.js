// Server create using http
import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Home Page My friend name is Mahesh");
    res.end();
  }

  if (req.url === "/contact") {
    res.write("Contact Page");
    res.end();
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log("Listening on PORT", PORT);
});
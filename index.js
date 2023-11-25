const express = require("./src/diy-router");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => res.send("Hello!"));
app.get("/test-route", (req, res) => res.send("Testing testing!"));
app.get("/user/:username", (req, res) => {
  // req.params.username
  const users = [
    { username: "su", name: "yongsu jeong" },
    { username: "ho", name: "ho tea" },
  ];

  const user = users.find((user) => user.username === req.params.username);

  if (!user) {
    res.send("User Not Found");
  } else {
    // res.writeHead({ Content-Type: "text/html"})
    // res.write()
    // res.end()
    res.send(`Hello ${user.name}!`);
  }
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

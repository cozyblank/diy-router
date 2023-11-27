// application/json => { "name": "aa", "age": ""}
// req.body.name =
// req.body.age =

// req.params ==> { username: 5 }
// req.params.username = 5

const path = require("path");
const express = require("./src/diy-router");
const app = express();

const PORT = 3000;

app.static("static");
app.static("public");

// // 1. css, js, png 정적인 자원
// ==> public ==> 모든 파일을 읽어와 ==> public/hello.png ==> 확장자 존재 여부
// 1. 요청으로 들어온 url을 보니 확장자가 존재한다면
// 2. 등록한 public 등등의 정적인 파일이 저장된 폴더에 접근해서 해당 파일을 찾고 ==> 응답으로 전달한다.
// localhost:3000/hello.png ==> public ==>

// app.get("/hello.png", (req, res) => {
//   // 1. hello.png 파일 읽어온다 (이진수)
//   // 2. 파일 확장자 추출
//   // 3. HTTP Header: content-type: 추출한 확장자
//   // 4. HTTP Body: 읽어온 파일
//   // 5. HTTP 응답
// })

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

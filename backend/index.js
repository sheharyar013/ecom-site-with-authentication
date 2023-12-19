const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const users = [{ username: "admin", password: "admin123" }];

app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.json({ message: "Login successful", user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  const existUser = users.find(
    (user) => user.name === username || user.email === email
  );

  if (existUser) {
    return res.status(400).json({
      message: "Username is already exist!",
    });
  }

  const user = {
    username,
    email,
    password,
  };

  users.push(user);

  res.status(200).json({
    message: "User is created successfully!",
    user,
  });
});

app.use("/users", (_, res) => {
  res.status(200).json({
    users,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

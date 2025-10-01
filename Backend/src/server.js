const express = require('express');
const dotenv = require('dotenv');
const authRoute = require('../routes/auth-route');
const conntectDb = require('../lib/db');
const cookieParser = require("cookie-parser")
const userRoute = require("../routes/user-route")
const chatRoute = require("../routes/chat-route")

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/chat", chatRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  conntectDb();
});
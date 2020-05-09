const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

//DB Set-up
mongoose.connect(
  process.env.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to mongoDB ...");
  }
);

//Body-Parser-Middleware
app.use(express.json());

//Import Routes
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");

//Route Middlewares
app.use("/api/user", authRouter);
app.use("/api/posts", postRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

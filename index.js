const express = require("express");
const cors = require("cors");
const connectToMongo = require("./database");
const userRoutes = require("./routes/userRoutes");
const postsRoutes = require("./routes/postsRoutes");
const commentsRoutes = require("./routes/commentsRoutes");

const App = express();
process.env.NODE_ENV !== "production" ? require("dotenv").config() : null;
const port = process.env.PORT || 8080;

connectToMongo();
//application
App.use(cors());
App.use(express.json({ extended: false }));
App.use("/api/v1/users", userRoutes);
App.use("/api/v1/posts", postsRoutes);
App.use("/api/v1/comments", commentsRoutes);

App.listen(port, (err, successs) => {
  if (err) throw err;
  console.log(`server running on port ${port}`);
});

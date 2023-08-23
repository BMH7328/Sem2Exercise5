const express = require("express");
const mongoose = require("mongoose");

// create an instance of express
const app = express();

// middleware to handle JSON request
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/shopping")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// routes
const itemRouter = require("./routes/item");

app.use("/items", itemRouter);

app.get("/", (req, res) => {
  res.send("<a href='/item'>Shopping List</a>");
});

// start the server
app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});

require("dotenv").config();
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/data")
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const express = require("express");
const app = express();

app.use(express.json());

const shoppinglistController = require("./controller/shoppingList");
const itemController = require("./controller/item");
//const userController = require("./controller/user");

app.use(express.json());

/*app.get("/", (req, res) => {
  res.send("Working");
});*/

app.use("/shoppingList", shoppinglistController);
app.use("/item", itemController);
//app.use("/user", userController);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

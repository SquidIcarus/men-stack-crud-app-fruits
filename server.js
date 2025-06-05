// server.js

// Here is where we import modules
// We begin by loading Express
const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const Fruit = require("./models/fruit.js");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// GET /fruits
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  console.log(allFruits);
  res.render("fruits/index.ejs", { fruits: allFruits });
});

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
});

// GET /fruits/:fruitId
app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show.ejs", { fruit: foundFruit });
});



// POST /fruits
app.post("/fruits", async (req, res) => {
    console.log(req.body);
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits");
});

mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.port}`);
});



// models/fruit.js

const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  isReadyToEat: { type: Boolean, default: false },
});

module.exports = mongoose.model("Fruit", fruitSchema); // create model


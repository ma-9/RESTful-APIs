const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: mongoose.Schema.Types.String, required: true },
  price: { type: mongoose.Schema.Types.Number, required: true }
});

module.exports = mongoose.model("RESTful-API-Products", ProductSchema);

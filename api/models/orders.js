const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RESTful-API-Products",
    required: true
  },
  quantity: { type: mongoose.Schema.Types.Number, default: 1 }
});

module.exports = mongoose.model("RESTful-API-Orders", orderSchema);

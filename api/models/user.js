const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
    match: /^([a-z0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8}).([a-z]{2,8})/
  },
  password: { type: mongoose.Schema.Types.String, required: true }
});

module.exports = mongoose.model("RESTful-API-Users", userSchema);

const mongoose = require("mongoose");
const FoundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be atleast 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Enter a valid email"],
  },
  phone: {
    type: String,
    match: [/^[0-9]{10}$/, "Enter a valid phone number"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  imagePath: {
    type: String,
  },
});

module.exports = mongoose.model("Found", FoundSchema);

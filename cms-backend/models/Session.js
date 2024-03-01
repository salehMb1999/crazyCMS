const mongoose = require("mongoose");

let Session = mongoose.model("Sessions", {
  title: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
  },

  time: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  course: {
    type: String,
    required: true,
  },

  created_AT: {
    type: String,
    required: true,
  },
});

module.exports = Session;

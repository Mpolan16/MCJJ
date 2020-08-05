const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedStoriesSchema = new Schema({
  story: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now
  }
});

const SavedStories = mongoose.model("SavedStories", savedStoriesSchema);

module.exports = SavedStories;
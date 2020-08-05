const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storyTemplatesSchema = new Schema({
  title: { type: String, required: true },
  story: { type: String, required: true },
  prompts: { type: Array, required: true },  
  date: {
    type: Date,
    default: Date.now
  },
  category: { type: String },
  language: { type: String }
});

const StoryTemplates = mongoose.model("StoryTemplates", storyTemplatesSchema);

module.exports = StoryTemplates;
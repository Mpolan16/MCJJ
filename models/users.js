const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  userid: { type: String, required: true, unique: true },
  storytemplates: [
    {
      type: Schema.Types.ObjectId,
      ref: "StoryTemplates"
    }
  ],
  savedstories: [
    {
      type: Schema.Types.ObjectId,
      ref: "SavedStories"
    }
  ]
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;

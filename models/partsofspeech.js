const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partsOfSpeechSchema = new Schema({
  partOfSpeech: { type: String, required: true }
});

const PartsOfSpeech = mongoose.model("PartsOfSpeech", partsOfSpeechSchema, "partsofspeech");

module.exports = PartsOfSpeech;
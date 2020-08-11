const router = require("express").Router();
const partsOfSpeechController = require("../../controllers/partsOfSpeechController");

// Matches with "/api/partsofspeech"
router
    .route("/")    
    .get(partsOfSpeechController.findAllPartsOfSpeech);

module.exports = router;
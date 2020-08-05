const router = require("express").Router();
const savedStoriesController = require("../../controllers/savedStoriesController");

// Matches with "/api/savedstories"
router
    .route("/")    
    .post(savedStoriesController.createSavedStory);

// Matches with "/api/savedstories/:id"
router
    .route("/:id")
    .get(savedStoriesController.findSavedStoryById)  
    .delete(savedStoriesController.removeSavedStoryById);

module.exports = router;
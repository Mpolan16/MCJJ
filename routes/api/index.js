const router = require("express").Router();
const userRoutes = require("./users");
const storyTemplateRoutes = require("./storytemplates");
const savedStoryRoutes = require("./savedstories");
const partsOfSpeechRoutes = require("./partsofspeech");

//Users routes
router.use("/users", userRoutes);
//Story Templates routes
router.use("/storytemplates", storyTemplateRoutes);
//Saved Stories routes
router.use("/savedstories", savedStoryRoutes);
//Parts Of Speech routes
router.use("/partsofspeech", partsOfSpeechRoutes);

module.exports = router;

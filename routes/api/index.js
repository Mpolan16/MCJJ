const router = require("express").Router();
const userRoutes = require("./users");
const storyTemplateRoutes = require("./storytemplates");
const savedStoryRoutes = require("./savedstories");

//Users routes
router.use("/users", userRoutes);
//Story Templates routes
router.use("/storytemplates", storyTemplateRoutes);
//Saved Stories routes
router.use("/savedstories", savedStoryRoutes);

module.exports = router;

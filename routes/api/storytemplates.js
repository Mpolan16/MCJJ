const router = require("express").Router();
const storyTemplatesController = require("../../controllers/storyTemplatesController");

// Matches with "/api/storytemplates"
router
    .route("/")
    .get(storyTemplatesController.findAllTemplates)
    .post(storyTemplatesController.createTemplate);

// Matches with "/api/storytemplates/:id"
router
    .route("/:id")
    .get(storyTemplatesController.findTemplatesById)  
    .put(storyTemplatesController.updateTemplateById)
    .delete(storyTemplatesController.removeTemplateById);

// Matches with "/api/storytemplates/category/:category"
router
    .route("/category/:category")  
    .get(storyTemplatesController.findTemplatesByCategory);  

// Matches with "/api/storytemplates/language/:language"
router
    .route("/language/:language")  
    .get(storyTemplatesController.findTemplatesByLanguage);   

// Matches with "/api/storytemplates/catlang/:category/:language"
router
    .route("/catlang/:category/:language")  
    .get(storyTemplatesController.findTemplatesByCategoryAndLanguage);  


// router
//     .route("/api/storytemplates")  
//     .get(storyTemplatesController.findAllTemplates); 

module.exports = router;
//GetAllTemplates
//GetTemplatesByID
//GetTemplatesByCategory
//GetTemplatesByLangauge
//inserttemplate
//updatetemplatebyid
//deletetemplatebyid

const db = require("../models");

// Defining methods for the usersController
module.exports = {
    createTemplate: function(req, res) {
        db.StoryTemplates.create(req.body)  //need to be destructured?  ({ title: req.body.title, story: req.body.story, prompts: req.body.prompts, category: req.body.category, language: req.body.language })
          .then(({ _id }) => db.Users.findOneAndUpdate({userid: req.body.userid}, { $push: {storytemplates: _id } }, { new: true }))
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },  
    findAllTemplates: function(req, res) {
        db.StoryTemplates.find({}) //empty object returns all?
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },    
    findTemplatesById: function(req, res) {
        db.StoryTemplates.findById({ _id: req.params.id })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findTemplatesByCategory: function(req, res) {
        db.StoryTemplates.find({ category: req.params.category })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findTemplatesByLanguage: function(req, res) {
        db.StoryTemplates.find({ language: req.params.language })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },          
    updateTemplateById: function(req, res) {
        db.StoryTemplates.findOneAndUpdate({ _id: req.params.id }, req.body) //need to be destructured?
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    removeTemplateById: function(req, res) {
        db.StoryTemplates.findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};
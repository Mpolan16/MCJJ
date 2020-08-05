//getsavedstorybyid
//insertsavedstory
//deletesavedstorybyid
//intentionally do not include updatesavedstory?

const db = require("../models");

// Defining methods for the usersController
module.exports = {
    createSavedStory: function(req, res) {
        db.SavedStories.create(req.body)  //need to be destructured?  ({ story: req.body.story, prompts: req.body.prompts, category: req.body.category, language: req.body.language })
          .then(({ _id }) => db.Users.findOneAndUpdate({userid: req.body.userid}, { $push: {savedstories: _id } }, { new: true }))
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },  
    findSavedStoryById: function(req, res) {
        db.SavedStories.findById({ _id: req.params.id })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    removeSavedStoryById: function(req, res) {
        db.SavedStories.findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};
const db = require("../models");

// Defining methods for the usersController
module.exports = {
    findAllPartsOfSpeech: function(req, res) {
        //console.log("findall");
        db.PartsOfSpeech.find({}).sort({partOfSpeech: 1}) //empty object returns all, sorting ascending
        .then(dbModel =>{
            //console.log("hello", dbModel);
            res.json(dbModel)})
        .catch(err => res.status(422).json(err));
    }
};
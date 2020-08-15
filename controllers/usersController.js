//getuser
//insertuser
//updateuser
//deleteuser
//gettemplatesbyuser
//getsavedstoriesbyuser

const db = require("../models");

// Defining methods for the usersController
module.exports = {
  createUser: function(req, res) {
    db.Users.create(req.body)  //need to be destructured?  ({ userid: req.body.userid, password: req.body.password })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUserById: function(req, res) {
    db.Users.findById({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },  
  updateUser: function(req, res) {
    db.Users.findOneAndUpdate({ _id: req.params.id }, req.body) //same as insert - need to be destructured?
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeUser: function(req, res) {
    db.Users.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },  
  findTemplatesByUser: function(req, res) {
    db.Users.find({ userid: req.params.userid })
      .populate("storytemplates")
      .then(dbModel => res.json(dbModel))
      //console.log(dbModel[0].storytemplates[0].story);
      .catch(err => res.status(422).json(err));
  },  
  findSavedStoriesByUser: function(req, res) {
    db.Users.find({ _id: req.params.id })
      .populate("savedstories")
      .then(dbModel => res.json(dbModel))      
      .catch(err => res.status(422).json(err));
  }
};

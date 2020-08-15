import axios from "axios";

export default {
  /******************/
  /*Begin users data*/
  /******************/
  //Inserts a new user
  insertUser: function(userData) {
    return axios.post("/api/users", userData);
  },
  //Gets a user by id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },  
  //Updates a user by id
  updateUser: function(id, userData) {
    return axios.put("/api/users/" + id, userData);
  },
  //Deletes a user by id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Gets all templates for a given id (an id will also have a userid)
  getTemplatesByUser: function(userid) {
    return axios.get("/api/users/templates/" + userid);
  },
  // Gets all saved stories for a given id
  getSavedStoriesByUser: function(id) {
    return axios.get("/api/users/stories/" + id);
  },
  /******************/
  /*End users data*/
  /******************/

  /******************/
  /*Begin template data*/
  /******************/
  //Inserts a new template
  insertTemplate: function(templateData) {
    return axios.post("/api/storytemplates", templateData);
  },
  //Gets all templates
  getTemplates: function() {
    return axios.get("/api/storytemplates");
  },  
  //Gets a specific template by id
  getTemplateById: function(id) {
    return axios.get("/api/storytemplates/" + id);
  },    
  //Updates a template by id
  updateTemplate: function(templateData) {    
    return axios.put("/api/storytemplates/" + templateData.id, templateData);
  },  
  //Removes a template by id
  deleteTemplate: function(templateData) {
    return axios.delete("/api/storytemplates/" + templateData.id, {data: {userid: templateData.userid}});
  },  
  //Gets all templates for a specific category
  getTemplatesByCategory: function(category) {
    return axios.get("/api/storytemplates/category/" + category);
  }, 
  //Gets all templates for a specific category
  getTemplatesByLanguage: function(language) {
    return axios.get("/api/storytemplates/language/" + language);
  },
  //Gets all templates for a specific category AND language
  getTemplatesByCategoryAndLanguage: function(category, language) {
    return axios.get("/api/storytemplates/catlang/" + category + "/" + language);
  },
  /******************/
  /*End template data*/
  /******************/  

  /******************/
  /*Begin saved stories data*/
  /******************/
  //Inserts a new saved story
  insertSavedStory: function(storyData) {
    return axios.post("/api/savedstories", storyData);
  },  
  //Gets a specific saved story by id
  getSavedStoryById: function(id) {
    return axios.get("/api/savedstories/" + id);
  },
  //Removes a template by id
  deleteSavedStory: function(id) {
    return axios.delete("/api/savedstories/" + id);
  },
  /******************/
  /*End template data*/
  /******************/   

  /******************/
  /*Begin parts of speech data*/
  /******************/
  //Inserts a new saved story
  getAllPartsOfSpeech: function() {
    return axios.get("/api/partsofspeech");
  }
  /******************/
  /*End parts of speech data*/
  /******************/     
};

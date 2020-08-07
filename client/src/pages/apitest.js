//import React from "react";
import React, { useEffect } from "react";
import SaveLib from "../components/saveLib";
import Voice from "../components/voice";
// import {Link} from "react-router-dom";
// import stories from "../utils/stories.json";

import API from "../utils/API";

function Created() {

    //   useEffect(() => {
    //         // For demonstration purposes, we mock an API call.
    //         API.getTemplateById("5f2c8fe37e12070aa83bfd1d").then((res) => {
    //           //setDeveloperState(res);
    //           //console.log("Developer State:");
    //           console.log(res.data.prompts);
    //         });
    //       }, []);    

    function processStuff() {
        //////////////////////
        //get a template by id
        // API.getTemplateById("5f2c8fe37e12070aa83bfd1d").then((res) => {
        //           console.log(res.data.prompts);
        //         });

        /////////////////////
        //insert a new user
        // const userData = {
        //     userid: "mtest",
        //     password: "test1"
        // }

        // API.insertUser(userData).then((res) => {
        //               console.log(res);
        // });

        /////////////////////
        //get user by id
        // API.getUser("5f2ca0299139760a380406d4").then((res) => {
        //           console.log(res);
        //         });

        /////////////////////
        //update user by id
        // const userData = {
        //     userid: "mtest",
        //     password: "test3"
        // }        
        // API.updateUser("5f2ca0299139760a380406d4",userData).then((res) => {
        //           console.log(res);
        //         });

        /////////////////////
        //delete user by id
        // API.deleteUser("5f2ca0299139760a380406d4").then((res) => {
        //           console.log(res);
        //         });

        /////////////////////
        //insert a new template
        // const templateData = {
        //     title: "Test Story",
        //     story: "This is a test story",
        //     prompts: ["adjective","adverb","noun"],
        //     category: "funny stories",
        //     language: "English",
        //     userid: "jtest@hotmail.com"    //----userid ---where is that gonna come from - can it be in templateData or somewhere else???
        // }

        // API.insertTemplate(templateData).then((res) => {
        //               console.log(res);
        // });      
        
        
        //////////////////////
        //get templates by user
    //     API.getTemplatesByUser("5f2c14f844a95c13b0a837d0").then((res) => {
    //       console.log(res.data[0]);
    //     });

        //////////////////////
        //get templates by language
         API.getTemplatesByLanguage("English").then((res) => {
           console.log(res);
         });
    
    //////////////////////
    //get templates by category and language
    //      API.getTemplatesByCategoryAndLanguage("funny stories","English").then((res) => {
    //        console.log(res);
    //      });    

    }

    return(
        <div>
            <p>Generated Madlib</p>    

            <button onClick={processStuff}>
                submit
            </button>      
      
            {/* here we add the code for the generated madlib */}
            <SaveLib />


            <Voice />
        </div>
        
    );
}


export default Created;


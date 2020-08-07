import React, {Component} from "react";
//import React, { useEffect } from "react";
import SaveLib from "../components/savedLibs";
// import {Link} from "react-router-dom";
// import stories from "../utils/stories.json";


class Created extends Component {


    //component did mount

    //   useEffect(() => {
    //         // For demonstration purposes, we mock an API call.
    //         API.getTemplateById("5f2c1a5cade96c1b044166ce").then((res) => {
    //           //setDeveloperState(res);
    //           //console.log("Developer State:");
    //           console.log(res);
    //         });
    //       }, []);    
    //no square brackets makes it go every time the page renders
    //when certain data changes put the name of the state in the square brackets

    //make API call to mongo to get 

    render() {
        return(
            <div>
                <p>Generated Madlib</p>            
        
                {/* here we add the code for the generated madlib */}
                <SaveLib />
                {/* save, delete, and create new buttons with onclick functions 
                should these be buttons or components */}

                <button id = "save">Save this Story</button>
                <button id = "delete">Delete this Story</button>
                <a href = "/storySelection">Pick another story</a>


               
            </div>
            
        );
    }
}


export default Created;


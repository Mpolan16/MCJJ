import React from "react";
//import React, { useEffect } from "react";
import SaveLib from "../components/saveLib";
import Voice from "../components/voice";
// import {Link} from "react-router-dom";
// import stories from "../utils/stories.json";


function Created() {

    //   useEffect(() => {
    //         // For demonstration purposes, we mock an API call.
    //         API.getTemplateById("5f2c1a5cade96c1b044166ce").then((res) => {
    //           //setDeveloperState(res);
    //           //console.log("Developer State:");
    //           console.log(res);
    //         });
    //       }, []);    

    return(
        <div>
            <p>Generated Madlib</p>            
      
            {/* here we add the code for the generated madlib */}
            <SaveLib />


            <Voice />
        </div>
        
    );
}


export default Created;


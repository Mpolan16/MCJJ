import React from "react";
import SaveLib from "../components/saveLib";
import Voice from "../components/voice";
// import {Link} from "react-router-dom";
// import stories from "../utils/stories.json";


function Create() {
    return(
        <div>
            <p>Generated Madlib</p>
            {/* this is where they enter the words and click submit */}
            {/* here we add the code for the generated madlib */}
            <SaveLib />

            
            <Voice />
        </div>
        
    );
}


export default Create;


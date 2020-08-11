import React from "react";
import {Link} from "react-router-dom";

function Home() {
    return(
        <div>
            <p>home: Welcome to MadLibs</p>
            {/* put an image here */}
            <Link to = "/storySelection">
                Click here to select options for your story
            </Link>
            <br>
            </br>
            <Link to = "/createTemplate">
                Click here to create a template
            </Link>
        </div>
    );
}

export default Home;
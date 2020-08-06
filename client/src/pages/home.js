import React from "react";
import {Link} from "react-router-dom";

function Home() {
    return(
        <div>
            <p>home: Welcome to MadLibs</p>
            {/* put an image here */}
            <Link to = "/storySelection">
                pick Story selection before Generating a MadLib
            </Link>
        </div>
    );
}

export default Home;
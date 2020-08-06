// create a separate page for story selection form (which adds language, or category in future and THEN goes to Create(complete,generate) component)

import React from "react";
import {Link} from "react-router-dom";
// import stories from "../utils/stories.json";


function StorySelection() {
    return(
        <div>
            <p>Select language here, select category here?</p>
            {/* radio buttons for spanish or english stories, category, length */}

            <Link to = "/create">
                Generate a MadLib
            </Link>
        </div>
    );
}

export default StorySelection;
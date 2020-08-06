// create a separate page for story selection form (which adds language, or category in future and THEN goes to Create(complete,generate) component)

import React from "react";
import {Link} from "react-router-dom";
// import stories from "../utils/stories.json";


function StorySelection() {
    return(
        <div>
            {/* radio buttons for spanish or english stories, category, length */}
            <h3>Select language:</h3>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                
                <label className="btn btn-secondary active">
                    <input type="radio" name="options" id="lang1" checked /> English
                </label>
                <label className="btn btn-secondary">
                    <input type="radio" name="options" id="lang2" /> Spanish
                </label>
            </div>

            <h3>Select Category:</h3>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                
                <label className="btn btn-secondary active">
                    <input type="radio" name="options" id="cat1" checked /> Funny Story
                </label>
                <label className="btn btn-secondary">
                    <input type="radio" name="options" id="cat2" /> Scary Story
                </label>
                <label className="btn btn-secondary">
                    <input type="radio" name="options" id="cat3" /> ??????
                </label>
            </div>
            <br></br>

            <Link to = "/create">
                Generate my (fill in name)
            </Link>
        </div>
    );
}

export default StorySelection;


// not sure where to put these
//$().button('toggle')
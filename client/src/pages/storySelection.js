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

            <h3>Select length:</h3>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                
                <label className="btn btn-secondary active">
                    <input type="radio" name="options" id="option1" checked /> One Paragraph
                </label>
                <label className="btn btn-secondary">
                    <input type="radio" name="options" id="option2" /> Two Paragraphs
                </label>
                <label className="btn btn-secondary">
                    <input type="radio" name="options" id="option3" /> Three Paragraphs
                </label>
            </div>
            <br></br>

            <Link to = "/create">
                Generate a (fill in name)
            </Link>
        </div>
    );
}

export default StorySelection;


// not sure where to put these
//$().button('toggle')
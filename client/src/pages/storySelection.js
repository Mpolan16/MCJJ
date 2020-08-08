// create a separate page for story selection form (which adds language, or category in future and THEN goes to Create(complete,generate) component)

import React from "react";
import {Link} from "react-router-dom";
// import stories from "../utils/stories.json";


function StorySelection() {
    return(
        <div>
            {/* radio buttons for spanish or english stories, category, length */}
            <div>
                <h3>Select language:</h3>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
            
                    <label className="btn btn-secondary">
                        <input type="radio" name="language" id="lang1" /> English
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="language" id="lang2" /> Spanish
                    </label>

                </div>
            </div>
            <div>
                <h3>Select Category:</h3>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    
                    <label className="btn btn-secondary">
                        <input type="radio" name="category" id="cat1"  /> Funny Story
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="category" id="cat2" /> Scary Story
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="category" id="cat3" /> ??????
                    </label>

                </div>
            </div>

            <br></br>
           
            <Link to = "/wordEntry">
                Now enter the missing words
            </Link>
        </div>
    );
}

export default StorySelection;


// not sure where to put these

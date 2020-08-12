// create a separate page for story selection form (which adds language, or category in future and THEN goes to Create(complete,generate) component)

import React, { useState } from "react";
import {Link} from "react-router-dom";
// import stories from "../utils/stories.json";


function StorySelection() {
    const [lang, setLang] = useState();
    const [cat, setCat] = useState();
    
    function setLanguage() {
        if (document.getElementById("lang1").checked){
            setLang("English");
        } else {
            setLang("Spanish");
        }
    }

    function setCategory() {
        if (document.getElementById("cat1").checked){
            setCat("Funny");
        } else if (document.getElementById("cat2").checked) {
            setCat("Scary");
        } else {
            setCat("Fables");
        }
    }

    return(
        <div>
            
          
                <h3>Select language:</h3>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
            
                    <label className="btn btn-secondary">
                        <input onClick = {setLanguage} type="radio" name="language" id="lang1" value = "English" /> English
                    </label>
                    <label className="btn btn-secondary">
                        <input onClick = {setLanguage} type="radio" name="language" id="lang2" value = "Spanish" /> Spanish
                    </label>

                </div>
            
         
                <h3>Select Category:</h3>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    
                    <label className="btn btn-secondary">
                        <input onClick = {setCategory} type="radio" name="category" id="cat1" value = "Funny"  /> Funny Story
                    </label>
                    <label className="btn btn-secondary">
                        <input onClick = {setCategory} type="radio" name="category" id="cat2" value = "Scary" /> Scary Story
                    </label>
                    <label className="btn btn-secondary">
                        <input onClick = {setCategory} type="radio" name="category" id="cat3" value = "Fables" /> Fables
                    </label>
                    {/* Only shows up if Spanish is chosen
                    <label className="btn btn-secondary">
                        <input onClick = {setCategory} type="radio" name="category" id="cat4" value = "Cuentos" /> Fables
                    </label> */}

                </div>
           
            <br></br>
           
            <Link 
            
            
            
            to={{
                pathname: '/create',
                state: {lang, cat}
                }}
            >
                Now enter the missing words
            </Link>

           
        </div>
    );
}

export default StorySelection;



// create a separate page for story selection form (which adds language, or category in future and THEN goes to Create(complete,generate) component)

import React, { useState } from "react";
import {Link} from "react-router-dom";
// import stories from "../utils/stories.json";


function StorySelection() {
    const [lang, setLang] = useState();
    const [cat, setCat] = useState();
    
    
    function setLanguage() {
        if (document.getElementById("eng").checked){
            setLang("English");
        } else {
            setLang("Spanish");
        }
    }

    function setCategory() {
        if (document.getElementById("funny").checked){
            setCat("Funny");
        } else if (document.getElementById("scary").checked) {
            setCat("Scary");
        } else if (document.getElementById("fables").checked) {
            setCat("Fables");
        } else if (document.getElementById("cuentos").checked){
            setCat("Cuentos");
        }
    }

    return(
        <div>
            
          
                <h3>Select language:</h3>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
            
                    <label className="btn btn-secondary">
                        <input onClick = {setLanguage} type="radio" name="language" id="eng" value = "English" /> English
                    </label>
                    <label className="btn btn-secondary">
                        <input onClick = {setLanguage} type="radio" name="language" id="spanish" value = "Spanish" /> Spanish
                    </label>

                </div>
            
         
                <h3>Select Category:</h3>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    
                    <label className="btn btn-secondary">
                        <input onClick = {setCategory} type="radio" name="category" id="funny" value = "Funny"  /> Funny Story
                    </label>
                    <label className="btn btn-secondary">
                        <input onClick = {setCategory} type="radio" name="category" id="scary" value = "Scary" /> Scary Story
                    </label>
                    <label className="btn btn-secondary">
                        <input onClick = {setCategory} type="radio" name="category" id="fables" value = "Fables" /> Fables
                    </label>

                    {/* Only shows up if Spanish is chosen */}
                    <label style={{ display: lang === "Spanish" ? "inline" : "none" }} className="btn btn-secondary">
                        <input onClick = {setCategory}  type="radio" name="category" id="cuentos" value = "Cuentos" /> Cuentos
                    </label>

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



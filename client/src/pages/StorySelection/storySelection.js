// create a separate page for story selection form (which adds language, or category in future and THEN goes to Create(complete,generate) component)
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import React, { useState } from "react";
import {Link} from "react-router-dom";
// import stories from "../utils/stories.json";


function StorySelection() {
    const [lang, setLang] = useState();
    const [cat, setCat] = useState();
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState("1");
    
    
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
        } else if (document.getElementById("cuentos").checked){
            setCat("Cuentos");
        }
    }


    return(
        <div>
            <h3>Select language:</h3>
            <ButtonGroup toggle3>
        
                <label className="btn btn-secondary">
                    <ToggleButton onClick = {setLanguage} type="radio" name="language" id="eng" value = "English" /> English
                </label>
                <label className="btn btn-secondary">
                    <ToggleButton onClick = {setLanguage} type="radio" name="language" id="spanish" value = "Spanish" /> Spanish
                </label>

            </ButtonGroup>

            <br></br>
        
    
            <h3>Select Category:</h3>
            <ButtonGroup toggle2>
            
                <label className="btn btn-secondary">
                    <ToggleButton onClick = {setCategory} type="radio" name="category" id="funny" value = "Funny"  /> Funny Story
                </label>
                <label className="btn btn-secondary">
                    <ToggleButton onClick = {setCategory} type="radio" name="category" id="scary" value = "Scary" /> Scary Story
                </label>
                <label style={{ display: lang === "Spanish" ? "inline" : "none" }} className="btn btn-secondary">
                    <ToggleButton onClick = {setCategory}  type="radio" name="category" id="cuentos" value = "Cuentos" /> Cuentos
                </label>
            </ButtonGroup>
           
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



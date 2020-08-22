// create a separate page for story selection form (which adds language, or category in future and THEN goes to Create(complete,generate) component)
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import "./storySelection.css";
import React, { useState } from "react";
import {Link} from "react-router-dom";
// import stories from "../utils/stories.json";


function StorySelection() {
    const [lang, setLang] = useState();
    const [cat, setCat] = useState();
    
    function setLanguage(selectedValue) {
        setLang(selectedValue) 
        console.log(selectedValue);
        if (selectedValue === "Spanish"){

            const cuentosBtn = document.getElementById("cuentosBtn");
            cuentosBtn.disabled = true;
        }  
    }

    function setCategory(selectedValue) {
        setCat(selectedValue)
    }
    

    return(
        <Container>
          <Card>
            <h3>Select Language:</h3>
                <ToggleButtonGroup type="checkbox" name = "language" value = {lang} onChange = {setLanguage}>
                    <ToggleButton className = "btns" value={"English"}>English</ToggleButton>
                    <ToggleButton className = "btns" value={"Spanish"}>Spanish</ToggleButton>
                </ToggleButtonGroup>
                <br />

            <h3>Select Category:</h3>
                <ToggleButtonGroup type="checkbox" name = "category" value = {cat} onChange = {setCategory} >
                    <ToggleButton className = "btns" value={"Funny"}>Funny</ToggleButton>
                    <ToggleButton className = "btns" value={"Scary"}>Scary</ToggleButton>
                    <ToggleButton className = "btns" id = "cuentosBtn" disabled value={"Cuentos"}>Cuentos</ToggleButton>
                </ToggleButtonGroup>
          </Card>

           
        <div id = "createStory">
            <Button className = "btns" >
                <Link 
                to={{
                    pathname: '/create',
                    state: {lang, cat}
                    }}
                >
                    Now enter the missing words
                </Link>
            </Button> 
        </div>
           
        </Container>
    );
}

export default StorySelection;



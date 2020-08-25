// create a separate page for story selection form (which adds language, or category in future and THEN goes to Create(complete,generate) component)
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import "./storySelection.css";
import React, { useState } from "react";
import {Link} from "react-router-dom";
// import stories from "../utils/stories.json";


function StorySelection() {
    const [lang, setLang] = useState("English");
    const [cat, setCat] = useState("Funny");
    
    function setEnglish() {
        setLang("English"); 
    }

    function setSpanish() {
        setLang("Spanish"); 
    }

    function setFunny() {
        setCat("Funny");
    }

    function setScary() {
        setCat("Scary");
    }

    function setCuentos() {
        setCat("Cuentos");
    }

    return(
        <Container>
            
           
            <Card>
                <h3>Select Language:</h3>
                    <ToggleButtonGroup type="checkbox" name = "language" value = {lang} >
                        <ToggleButton onClick = {setEnglish} className = "btns" value={"English"}>English</ToggleButton>
                        <ToggleButton onClick = {setSpanish} className = "btns" value={"Spanish"}>Spanish</ToggleButton>
                    </ToggleButtonGroup>
                    <br />

                <h3>Select Category:</h3>
                    <ToggleButtonGroup type="checkbox" name = "category" value = {cat} >
                        <ToggleButton onClick = {setFunny} className = "btns" value={"Funny"}>Funny</ToggleButton>
                        <ToggleButton onClick = {setScary} className = "btns" value={"Scary"}>Scary</ToggleButton>
                        {lang === "Spanish" && <ToggleButton onClick = {setCuentos} className = "btns" id = "cuentosBtn" value={"Cuentos"}>Cuentos</ToggleButton>}
                    </ToggleButtonGroup>
            </Card>

            <Row id = "btnRow" >
                <Card id = "createBtnCard">
                    <Image id = "createChar" src = "../../Assets/create.png" />
                        <div id = "createStoryDiv">
                            <Button id = "createBtn" className = "btns" >
                                <Link id = "createLink"
                                to={{
                                    pathname: '/create',
                                    state: {lang, cat}
                                    }}
                                >
                                    Now enter the missing words
                                </Link>
                            </Button> 
                        </div>
                </Card>        
            </Row>
        </Container>
    );
}

export default StorySelection;



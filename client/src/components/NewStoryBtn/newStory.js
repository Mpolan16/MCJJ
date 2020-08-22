import React from "react";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import "./newStory.css";


function NewStory() {
    return(
        <Button className = "newStoriesBtn">
            <Image className = "btnImage"  src = "../../Assets/newStory.png"/>
            <p className = "btnText" >Fill In New Story</p>
        </Button>
    )
}

export default NewStory;
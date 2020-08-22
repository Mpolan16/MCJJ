import React from "react";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import "./writeNew.css";


function WriteNew() {
    return(
        <Button className = "newStoriesBtn">
            <Image className = "btnImage"  src = "../../Assets/newTemplate.png"/>
            <p className = "btnText">Write Your Own Story</p>
        </Button>
    )
}

export default WriteNew;
import React from "react";
import {Link} from "react-router-dom";
import { withAuthorization } from '../../components/Session';
import "./home.css";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function Home() {
    return(
        <Container>
            
            <Row>
                <Link to = "/storySelection">
                    <Button className = "newStoriesBtn"><Image className = "btnImage"  src = "../../Assets/newStory.png"/>
                    <p className = "btnText" >Click here to select options for your story</p>
                    </Button>
                </Link>

                <Image src = "../../Assets/hero.png" fluid />

                <Link to = "/createTemplate">
                    <Button className = "newStoriesBtn"><Image className = "btnImage"  src = "../../Assets/newTemplate.png"/>
                    <p className = "btnText">Click here to create a template</p>
                    </Button>
                </Link>
            </Row>
     
            
            
            {/* <p>The Home Page is accessible by every signed in user.</p> */}
           
            
            <br>
            </br>
           
        </Container>
        
    );
}

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(Home);
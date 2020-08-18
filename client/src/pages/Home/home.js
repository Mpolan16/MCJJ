import React from "react";
import {Link} from "react-router-dom";
import { withAuthorization } from '../../components/Session';
import "./home.css";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Home() {
    return(
        <Container>
            <h1>Welcome to ____</h1>
            <Row>
                <Image src = "../../Assets/hero.png" fluid />
            </Row>
     
            
            
            <p>The Home Page is accessible by every signed in user.</p>
           
            <Link to = "/storySelection">
                Click here to select options for your story
            </Link>
            <br>
            </br>
            <Link to = "/createTemplate">
                Click here to create a template
            </Link>
        </Container>
        
    );
}

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(Home);
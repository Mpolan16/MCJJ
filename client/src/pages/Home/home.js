import React from "react";
import {Link} from "react-router-dom";
import { withAuthorization } from '../../components/Session';
import "./home.css";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import NewStory from "../../components/NewStoryBtn/newStory";
import WriteNew from "../../components/WriteNewStoryBtn/writeNew";
import Col from 'react-bootstrap/Col'



function Home() {
    return(
        <Container>
    
            <Row>
                <Image id = "titleImg" src = "../../Assets/title.png" />
            </Row>
            <Row>
                <Col md={3}>
                    <Link to = "/storySelection">
                        <NewStory />
                    </Link>
                </Col >

                <Col md={5}>
                    <Image id = "heroImg" src = "../../Assets/hero.png" />
                </Col>

                <Col md={3}>
                    <Link to = "/createTemplate">
                        <WriteNew />
                    </Link>
                </Col>
            </Row>
     
            
            
            {/* <p>The Home Page is accessible by every signed in user.</p> */}
           
            
            <br>
            </br>
           
        </Container>
        
    );
}

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(Home);
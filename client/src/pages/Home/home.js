import React from "react";
import {Link} from "react-router-dom";
import { withAuthorization } from '../../components/Session';
import "./home.css";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//import Column from 'react-bootstrap/Column';
import NewStory from "../../components/NewStoryBtn/newStory";
import WriteNew from "../../components/WriteNewStoryBtn/writeNew";



function Home() {
    return(
        <Container>
            
            <Row>
                <Link to = "/storySelection">
                    <NewStory />
                </Link>

                <Image src = "../../Assets/hero.png" fluid />

                <Link to = "/createTemplate">
                    <WriteNew />
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
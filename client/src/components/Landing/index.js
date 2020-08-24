import React from 'react';
import "../../pages/Home/home.css";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
 
const Landing = () => (
  <div>
    <Container>
            <Row>
                <Image id = "titleImg" src = "../../Assets/title.png" />
            </Row>
            
            <Row>

                <Image src = "../../Assets/hero.png" />

            </Row>
           
        </Container>
  </div>
);
 
export default Landing;
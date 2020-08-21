import React from 'react';
import "../../pages/Home/home.css";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
 
const Landing = () => (
  <div>
    <Container>
            
            <Row>

                <Image src = "../../Assets/hero.png" fluid />

            </Row>
           
        </Container>
  </div>
);
 
export default Landing;
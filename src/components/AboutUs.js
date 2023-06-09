import React from "react";
import { Container, Row, Col } from "reactstrap";
import CustomNavbar from "./Navbar";
import "./styles/AboutUs.css";


function AboutUs() {
  return (
    <div>
      <CustomNavbar />
      <Container className="mt-sm-3">
        <Row>
          <Col xs={12} className="d-flex align-items-center">
            <div>
            
              <h2>

              <font color="white" size="10" face="tahoma" >About Us</font>
              </h2>
                 
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                varius, metus sed ultrices varius, lorem quam dapibus est, vel
                blandit augue libero ac risus.
              </p>
              <p>
                Morbi id dui ut justo scelerisque sagittis. Sed luctus tempus
                diam, nec tristique purus bibendum sed.
              </p>
             
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default AboutUs;
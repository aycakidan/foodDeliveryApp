import React from "react";
import { Container, Row, Col } from "reactstrap";
import Navbar from "./Navbar";

function HomePage() {
  return (
    <div>
      <Container className="mt-sm-3">
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <Navbar />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;

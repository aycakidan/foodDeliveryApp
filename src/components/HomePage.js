import React from "react";
import { Container, Row, Col } from "reactstrap";
import mainNavbar from "./Navbar";

function HomePage() {
  return (
    <div>
      <Container className="mt-sm-3">
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <mainNavbar />
          </Col>
        </Row>
      </Container>
      {<p>homega"</p>}
    </div>
  );
}

export default HomePage;

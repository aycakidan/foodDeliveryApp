import React from "react";
//import Navbar from "./Navbar";
import { Container, Row, Col } from "reactstrap";
import Collapse from "./Menu.js";
import Login from "./Login.js";

//import logo from "./assets/logo.jpg";

function App() {
    return (
    <div>
      <div class="Container mt-sm-3">
        <Container>
          <Row>
            <Col>
              <Collapse />
            </Col>
            <Col className="d-flex justify-content-end">
              <div className="ml-auto">
                <Login />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default App;

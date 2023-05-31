import React, { useState, useEffect } from "react";
//import Navbar from "./Navbar";
import { Container, Row, Col } from "reactstrap";
import Collapse from "./Menu.js";
import Login from "./Login.js";
import axios from 'axios';

//import logo from "./assets/logo.jpg";

function App() {

  const [items, setItems] = useState([]);
  // Database hook example
  useEffect(() => {
    // Fetch data from your API endpoint
    axios.get("http://localhost:3000/member")
        .then(response => {
          setItems(response.data);
        })
        .catch(error => {
          console.error("Error fetching items:", error);
        });
    }, []);

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

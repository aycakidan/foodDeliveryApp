import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import LoginPage from "./components/LoginPage.js";
import HomePage from "./components/HomePage.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <HomePage />
      ) : (
        <Container className="mt-sm-3">
          <Row>
            <Col xs={12} className="d-flex justify-content-center">
              <LoginPage onLogin={handleLogin} />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default App;

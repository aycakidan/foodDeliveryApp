import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import LoginPage from './components/LoginPage.js';
import HomePage from './components/HomePage.js';
import Settings from './components/Settings.js';
import './components/styles/LoginPage.css';
import Products from './components/Products.js';
import Cart from './components/Cart.js'
import AboutUs from './components/AboutUs.js';
function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Container className="mt-sm-3">
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <Routes>
              <Route
                path="/"
                element={isLoggedIn ? <Navigate to="/HomePage" /> : <LoginPage onLogin={handleLogin} />}
              />
              <Route
                path="/HomePage"
                element={isLoggedIn ? <HomePage /> : <Navigate to="/HomePage" />}
              />
              <Route
                path="/settings" Component={Settings}
                element={isLoggedIn ? <Settings /> : <Navigate to="/settings" />}
              />
              <Route
                path="/products" Component={Products}
                element={isLoggedIn ? <Products /> : <Navigate to="/products" />}
              />
              <Route
                path="/cart" Component={Cart}
                element={isLoggedIn ? <Cart /> : <Navigate to="/cart" />}
              />
              <Route
                path="/AboutUs" Component={AboutUs}
                element={isLoggedIn ? <AboutUs/> : <Navigate to="/AboutUs"/>}
              />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
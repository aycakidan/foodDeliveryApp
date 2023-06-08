import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import CustomNavbar from "./Navbar";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddItem = (itemName) => {
    const existingItemIndex = cartItems.findIndex((item) => item.name === itemName);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      const newItem = { name: itemName, quantity: 1 };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleOrderConfirmation = async () => {
    const orderDetails = '...'; // Replace with the actual order details

    try {
      const response = await axios.post('http://localhost:4000/members/login', null, { withCredentials: true });
      const memberEmail = response.data.member.email;
      const recipientEmail = memberEmail;

      axios.post('http://localhost:4000/send-email', { recipientEmail, orderDetails })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });
    } catch (error) {
      console.error('Error getting email', error);
    }
  };

  const handleRemoveItem = (itemName) => {
    const updatedCartItems = cartItems.filter((item) => item.name !== itemName);
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <Container className="mt-sm-3">
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <CustomNavbar />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <h3>Sepetim</h3>
            {cartItems.length === 0 ? (
              <p>Sepetinizde ürün bulunmamaktadır.</p>
            ) : (
              cartItems.map((item, index) => (
                <Card key={index} className="mb-3">
                  <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <Button color="danger" onClick={() => handleRemoveItem(item.name)}>
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button color="success" onClick={() => handleAddItem(item.name)}>
                      +
                    </Button>
                  </CardBody>
                </Card>
              ))
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Cart;

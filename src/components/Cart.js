import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import CustomNavbar from "./Navbar";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

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

  const handleRemoveFromCart = (itemName) => {
    const updatedCartItems = cartItems.filter((item) => item.name !== itemName);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="mt-3">
      <h3> My Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item, index) => (
          <Card key={index} className="mb-3">
            <CardBody>
              <CardTitle>{item.name}</CardTitle>
              <CardText>Quantity: {item.quantity}</CardText>
              <Button color="danger" onClick={() => handleRemoveFromCart(item.name)}>
                Remove
              </Button>
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
};

export default Cart;

import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import CustomNavbar from "./Navbar";
import Cart from "./Cart";

function Products() {
  const categories = [
    {
      label: "Ana Yemekler",
      items: [
        { name: "Yemek 1", description: "Açıklama 1" },
        { name: "Yemek 2", description: "Açıklama 2" },
        { name: "Yemek 3", description: "Açıklama 3" }
      ]
    },
    {
      label: "İçecekler",
      items: [
        { name: "İçecek 1", description: "Açıklama 1" },
        { name: "İçecek 2", description: "Açıklama 2" }
      ]
    },
    {
      label: "Çorba",
      items: [
        { name: "Çorba 1", description: "Açıklama 1" },
        { name: "Çorba 2", description: "Açıklama 2" }
      ]
    },
    {
      label: "Tatlı",
      items: [
        { name: "Tatlı 1", description: "Açıklama 1" },
        { name: "Tatlı 2", description: "Açıklama 2" }
      ]
    }
  ];

  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (itemName) => {
    const existingItem = cartItems.find((item) => item.name === itemName);
    if (existingItem) {
      existingItem.quantity += 1;
      setCartItems([...cartItems]);
    } else {
      const newItem = { name: itemName, quantity: 1 };
      setCartItems([...cartItems, newItem]);
    }
  };

  return (
    <div>
      <Container className="mt-sm-3">
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <CustomNavbar />
          </Col>
        </Row>

        {categories.map((category, index) => (
          <Row key={index} className="mt-3">
            <Col>
              <h3>{category.label}</h3>
              <Row>
                {category.items.map((item, itemIndex) => (
                  <Col key={itemIndex} md={6} className="mb-3">
                    <Card>
                      <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        <p>{item.description}</p>
                        <div className="d-flex justify-content-between">
                          <Button color="success" onClick={() => handleAddToCart(item.name)}>+</Button>
                          <Button color="danger">-</Button>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        ))}

        <Row>
          <Col className="mt-3">
            <Cart cartItems={cartItems} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Products;

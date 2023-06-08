import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import CustomNavbar from "./Navbar";
import Cart from "./Cart";
import axios from "axios";

function Products() {
  
  const [foods, setFoods] = useState([]);

  useEffect(() => {

    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:4000/foods');
        const fetchedFoods = response.data;
    
        const categories = fetchedFoods.map((food) => ({
          label: food.label,
          items: food.items.map((item) => ({
            name: item.name,
            description: item.price,
          })),
        }));
    
        setFoods(categories);
      } catch (error) {
        console.error('Error getting foods:', error);
      }
    };

    fetchFoods();
  }, []);

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

        {foods.map((category, index) => (
          <Row key={index} className="mt-3">
            <Col>
              <h3>{category.label}</h3>
              <Row>
                {category.items.map((item, itemIndex) => (
                  <Col key={itemIndex} md={6} className="mb-3">
                    <Card>
                      <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        <p>{item.description}$</p>
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

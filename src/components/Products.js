import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import CustomNavbar from "./Navbar";
import axios from "axios";
import Cart from "./Cart";

function Products() {
  const [foods, setFoods] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:4000/foods");
        const fetchedFoods = response.data;

        const categories = fetchedFoods.map((food) => ({
          label: food.label,
          items: food.items.map((item) => ({
            name: item.name,
            price: item.price,
          })),
        }));

        setFoods(categories);
      } catch (error) {
        console.error("Error getting foods:", error);
        
      }
    };

    fetchFoods();
    
  }, []);

  const handleAddToCart = (item) => {
    let updatedCartItems;
    const itemName = item.name
    const existingItem = cartItems.find((item) => item.name === itemName);

    if (existingItem) {
      updatedCartItems = cartItems.map((item) =>
        item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      const newItem = { name: itemName, price: item.price, quantity: 1 };
      updatedCartItems = [...cartItems, newItem];
    }

    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <CustomNavbar /> {/* Bu satır doğru kullanım */}
      <Container className="mt-sm-3">
        <Row>
          <Col xs={12}>
            {foods.map((category, index) => (
              <div key={index}>
                <h3>
                <font color="pink" size="5" face="tahoma">{category.label}</font>
                
                </h3>
                <Row>
                  {category.items.map((item, itemIndex) => {
                    const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
                    return (
                      <Col key={itemIndex} md={6} className="mb-3">
                        <Card>
                          <CardBody>
                            <CardTitle>{item.name}</CardTitle>
                            <p>{item.price}$</p>
                            <Button
                              color="success"
                              onClick={() => handleAddToCart(item)}
                            >
                              {existingItem ? `Added (${existingItem.quantity})` : "+"}
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
}

export default Products;

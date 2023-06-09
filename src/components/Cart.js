import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import axios from "axios";


  const Cart = ({ cartItems, setCartItems }) => {

    const handleOrderConfirmation = async () => {
      const orderDetails = [];
      let cost = 0;
      let count = 0;

      cartItems.forEach((item) => {
        for (let index = 0; index < item.quantity; index++) {
          const existingItem = orderDetails.find((item) => item.name === item.name);
          if(!existingItem) orderDetails.push(item.name);
          cost += parseFloat(item.price);
          count += 1;
        }
      });    
  
      try { 
        axios.post('http://localhost:4000/send-email', { orderDetails, cost, count }, { withCredentials: true }) 
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
        <h3> 
        
        <font color="pink" size="7" face="tahoma">My Cart</font>
        </h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty
          </p>
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
        {cartItems.length > 0 ? (
          <Button color="success" onClick={handleOrderConfirmation}>
            Give Order
          </Button>
        ) : (null)}
      </div>
    );
  };
  
  export default Cart;

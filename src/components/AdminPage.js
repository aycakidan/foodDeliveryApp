import React from "react";
import AdminNavbar from "./AdminNavbar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import axios from "axios";

const AdminPage = () => {
  const [food, setFood] = useState([]);

  useEffect(() => {
    const handleFoods = async () => {
      const response = await fetch(`http://localhost:4000/foods`, {
        method: "GET",
        json: true,
      });

      const data = await response.json();
      setFood(data);
    };
    handleFoods();
  }, []);

  const [ addingFood, setAddingFood ] = useState(false);
  const handleFoodEdit = () => {
    if(addingFood) setAddingFood(false)
    else setAddingFood(true)
  }

  const handleDeleteFood = async (categoryIndex, foodIndex) => {
    try {
      await fetch(`http://localhost:4000/foods/${categoryIndex}/${foodIndex}`, {
        method: 'DELETE',
      });
      
      const updatedFoods = [...food];
      updatedFoods[categoryIndex].items.splice(foodIndex, 1);
      setFood(updatedFoods);
      AdminPage()
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };  

  const [label, setLabel] = useState('');

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const [name , setName] = useState("")
  const [price , setPrice] = useState("")

  const handleTextChange = (event) => {
    setName(event.target.value);
  };

  const handleFloatChange = (event) => {
    setPrice(parseFloat(event.target.value));
  };

  const newFood = {
    label: label,
    name: name,
    price: price
  };

  const handleAddFood = async () => {
    axios.post('http://localhost:4000/foods', newFood)
    .then(response => {
      console.log(response.data); // Handle the response from the server
    })
    .catch(error => {
      console.error(error); // Handle any errors
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <AdminContainer>
        <AdminNavbar />     

        <div className="info">
          <div>
            <h3>Weekly Sales</h3>
            <p>$ 15000</p>
            <h4>Increased by 60%</h4>
          </div>
          <div>
            <h3>Weekly Orders</h3>
            <p>45,633</p>
            <h4>Increased by 45%</h4>
          </div>
          <div>
            <h3>Visitors Online</h3>
            <p>110,577</p>
            <h4>Increased by 5%</h4>
          </div>
        </div>

        <div>
          
          {addingFood === true ? (
            <><form onSubmit={handleSubmit}>
              <select id="dropdown" value={label} onChange={handleLabelChange}>
                <option value="">-- Select --</option>
                <option value="Main Courses">Main Courses</option>
                <option value="Soups">Soups</option>
                <option value="Deserts">Deserts</option>
                <option value="Drinks">Drinks</option>
              </select>
              <div>
                <label>Name</label>
                <input type="text" value={name} onChange={handleTextChange} />
              </div>
              <div>
                <label>Price</label>
                <input type="number" step="0.01" value={price} onChange={handleFloatChange} />
              </div>
              <button color="success" onClick={handleAddFood}>Add</button>
            </form><button onClick={handleFoodEdit}>Exit</button></>
          ) : (
            <button onClick={handleFoodEdit}>Add Product</button>
          )}
          
        </div>

        {
          food.map((item, index) => 
            item.items.map((food, foodIndex) => (
              <div key={`${index}-${foodIndex}`} className="food">
                <div>
                  <img src={food.image} alt={food.name} />
                  <h3>{food.name}</h3>
                  <p>{food.price}$</p>
                </div>
                <button onClick={() => handleDeleteFood(index, foodIndex)}>Delete</button>
              </div>
            ))
          )
        }
        <Footer/>
      </AdminContainer>
      
    </>
  );
};

const AdminContainer = styled.div`
  width: 80% !important;
  
  .info{
    display:flex;
    justify-content: space-between;
    margin:4rem auto;
  }
  @media (max-width:992px){
    .info{
      flex-direction: column;
      width:100%;
      justify-content: center;
      align-items: center;
      row-gap: 1rem;
      margin:1rem auto;
    }
    .info div{
      width:300px !important;
      padding:8px;
    }

  }
  .info div{
    width:25%;
    height:25%;
    align-items: center;
  }
  .info div:nth-child(1){
    background: #E4DECB;
    display:flex;
    
    flex-direction: column;
    justify-content: center;
  }
  .info div:nth-child(2){
    background: #C0C2E4;
    display:flex;
    flex-direction:column;
    justify-content: center;
  }
  .info div:nth-child(3){
    background: #B5E4DD;
      display:flex;

      flex-direction:column;
      justify-content: center;
  }

  .info p{
    color: green;
    font-size: large;
  }
  .food{
    background-color:#E59691;
    margin-top:0.5rem;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .food button{
    height: 50px;
    width:120px;
    font-size: 24px;
    border:0px;
    background-color: #E51909;
    color:white;
  }
`;

export default AdminPage;

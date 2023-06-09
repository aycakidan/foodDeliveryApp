import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import CustomNavbar from "./Navbar";
import axios from "axios";

function Settings() {
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const initializeForm = async () => {
    try {
      const response = await axios.get('http://localhost:4000/members/login', null, { withCredentials: true });
      const member = response.data.member;
      if(response.data.success){
        setUsername(member.username)
        setEmail(member.email)
      }
      else{
        console.log('Can not get member info')
      }
    } catch (error) {
      console.log("Error initializing form", error);
    }
  }

  initializeForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleInfoChange = async () =>{
    try {
      const response = await axios.get('http://localhost:4000/members/login', null, { withCredentials: true });
      const member = response.data.member;

      if(response.data.success){
        try {
          var result = await axios.put(`http://localhost:4000/members/${member._id}`, {
            addres: address,
            phoneNumber: phoneNumber,
            username: username,
            email: email,
            password: password,
            }, { withCredentials: true });

          if(result.data.success){
            console.log("Değişiklikler kaydedildi");
          }
          else console.log("Değişiklikler kaydedilemedi");
        } 
        catch (error) {
          console.log("Güncelleme hatası:", error);
        }
      }
      else console.log('The member id not represented in the database')
      
    } catch (error) {
      console.log("Error finding member", error);
    }
  }

  const handleDeleteMember = async () =>{
    try {
      const response = await axios.get('http://localhost:4000/members/login', null, { withCredentials: true });
      const member = response.data.member;
      console.log(member)

      if(response.data.success){
        try {
          var result = await axios.delete(`http://localhost:4000/members/${member._id}`, { withCredentials: true });

          if(result.data.success){
            console.log("Profil silindi");
          }
          else console.log("Profil silinemedi");
        } 
        catch (error) {
          console.log("Güncelleme hatası:", error);
        }
      }
      else console.log('The member id is not represented in the database')
      
    } catch (error) {
      console.log("Error finding member", error);
    }
  }

  return (
    <div>
      <Container className="mt-sm-3">
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <CustomNavbar />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mt-3">
            
            <font size="10" color="white" face="Roboto"> Edit Profile </font>

            
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="address">Add address</Label>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="phoneNumber">Add phoneNumber</Label>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="username">Update username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Update e-mail</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Change password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <div className="d-flex justify-content-between">
                <Button onClick={handleInfoChange} type="submit" color="primary">
                  Save
                </Button>
                <div style={{ width: "10px" }} /> {/* Boşluk */}
                <Button onClick={handleDeleteMember} type="submit" color="primary">
                  Delete my profile
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}




export default Settings;
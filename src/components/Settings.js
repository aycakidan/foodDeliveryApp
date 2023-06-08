import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import CustomNavbar from "./Navbar";
import axios from "axios";
import "./styles/Settings.css";

function Settings() {
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleInfoChange = async () =>{
    try {
      const response = await axios.post('http://localhost:4000/members/login', null, { withCredentials: true });
      const memberId = response.data.member._id;

      if(response.data.success){
        try {
          var result = await axios.put(`http://localhost:4000/members/${memberId}`, {
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
      const response = await axios.post('http://localhost:4000/members/login', null, { withCredentials: true });
      const memberId = response.data.memberId;

      if(response.data.success){
        try {
          var result = await axios.delete(`http://localhost:4000/members/${memberId}`, { withCredentials: true });

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
            <h2>Edit Profile</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="address">Adres Ekle</Label>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="phoneNumber">Numara Ekle</Label>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="username">Kullanıcı Adı Güncelle</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Mail Güncelle</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Şifre Değiştir</Label>
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
                  Değişikleri Kaydet
                </Button>
                <div style={{ width: "10px" }} /> {/* Boşluk */}
                <Button onClick={handleDeleteMember} type="submit" color="primary">
                  Profilimi Sil
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
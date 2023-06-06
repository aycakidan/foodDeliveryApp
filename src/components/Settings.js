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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // MongoDB'ye güncelleme isteği gönderme
      await axios.put("/api/members", {
        address,
        phoneNumber,
        username,
        email,
        password,
      });

      console.log("Değişiklikler kaydedildi");
    } catch (error) {
      console.log("Güncelleme hatası:", error);
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
                <Button type="submit" color="primary">
                  Değişikleri Kaydet
                </Button>
                <div style={{ width: "10px" }} /> {/* Boşluk */}
                <Button type="submit" color="primary">
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

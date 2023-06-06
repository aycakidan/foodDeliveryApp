import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from 'axios';


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password
    };

    axios.post("http://localhost:4000/member/login", newUser)
      .then(response => {
        console.log(response.data);
        setUsername("");
        setPassword("");
      })
      .catch(error => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Kullanıcı Adı</Label>
          <Input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Şifre</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </FormGroup>
        <Button type="submit" color="primary">Kayıt Ol</Button>
      </Form>
    </div>
  );
};

export default Register;

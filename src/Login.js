import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

export default class MyDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoginModalOpen: false,
      isRegisterModalOpen: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: 0
    };
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  toggleLoginModal = () => {
    this.setState(prevState => ({
      isLoginModalOpen: !prevState.isLoginModalOpen
    }));
  }

  toggleRegisterModal = () => {
    this.setState(prevState => ({
      isRegisterModalOpen: !prevState.isRegisterModalOpen
    }));
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({
      [name]: value
    });
  }

  handlePhoneNumber = (e) => {
    const value = e.target.value;

    const [setPhoneNumber] = this.state;
    const intValue = parseInt(value, 10); // Parse the value as an integer
    setPhoneNumber(isNaN(intValue) ? '' : intValue);
  }

  handleLoginFormSubmit = async (e) => {
    e.preventDefault();
  }
  
  handleRegisterFormSubmit = async (e) => {
    e.preventDefault();

    this.setState({
      username: '',
      email: '',
      password: ''
    });
  };
  
  render() {
    const { email, password, firstName, lastName, phoneNumber } = this.state;
    return (
      <div>
        <Dropdown isOpen={this.state.isOpen} toggle={this.toggleDropdown}>
          <DropdownToggle caret>
            Actions
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.toggleRegisterModal}>Üye Ol</DropdownItem>
            <DropdownItem onClick={this.toggleLoginModal}>Giriş Yap</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Modal isOpen={this.state.isRegisterModalOpen} toggle={this.toggleRegisterModal}>
          <ModalHeader toggle={this.toggleRegisterModal}>Üye Ol</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleRegisterFormSubmit}>
              <FormGroup>
                <Label for="firstName">Ad</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Soyad</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="phoneNumber">Numara</Label>
                <Input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">E-posta</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Parola</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <Button onClick={this.handleRegisterFormSubmit} color="primary" type="submit">Üye Ol</Button>
            </Form>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
          <ModalHeader toggle={this.toggleLoginModal}>Giriş Yap</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLoginFormSubmit}>
              <FormGroup>
                <Label for="email">E-posta</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Parola</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <Button onClick={this.handleLoginFormSubmit} color="primary" type="submit">Giriş Yap</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

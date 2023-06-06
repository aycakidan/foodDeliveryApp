import React from 'react';
import { Navbar as ReactstrapNavbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-scroll';

function Navbar() {
  return (
    <ReactstrapNavbar className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <Nav className="navbar-nav">
            <NavItem>
              <Link to="home" smooth={true} className="nav-link active" href="#">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="products" smooth={true} className="nav-link">Products</Link>
            </NavItem>
            <NavItem>
              <Link to="about" smooth={true} className="nav-link">About Us</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Profile
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>My Cart</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </div>
      </div>
    </ReactstrapNavbar>
  );
}

export default Navbar;

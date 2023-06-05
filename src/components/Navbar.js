import React from 'react';
import { 
  Navbar as ReactstrapNavbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

function mainNavbar() {
  return (
    <ReactstrapNavbar className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <Nav className="navbar-nav">
            <NavItem>
              <NavLink className="nav-link active" aria-current="page" href="#">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" href="#">Features</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" href="#">Pricing</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Dropdown link
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </div>
      </div>
    </ReactstrapNavbar>
  );
}

export default mainNavbar;

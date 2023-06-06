import React from 'react';
import { Navbar as ReactstrapNavbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, animateScroll as scroll } from 'react-scroll';

function Navbar() {

  const handleScrollToTop = () => {
    scroll.scrollToTop({
      duration: 0,
      smooth: true
    });
  }

  const handleScrollToProducts = () => {
    scroll.scrollTo('products', {
      duration: 250,
      smooth: true
    })
  }

  const handleScrollToAbout = () => {
    scroll.scrollTo('about', {
      duration: 250,
      smooth: true
    })
  }

  return (
    <ReactstrapNavbar className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <Nav className="navbar-nav">
            <NavItem>
              <Link onClick={handleScrollToTop} smooth={true} className="nav-link active" href="#">Home</Link>
            </NavItem>
            <NavItem>
              <Link onClick={handleScrollToProducts} to="products" smooth={true} className="nav-link" href=''>Products</Link>
            </NavItem>
            <NavItem>
              <Link onClick={handleScrollToAbout} to="about" smooth={true} className="nav-link" href=''>About Us</Link>
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

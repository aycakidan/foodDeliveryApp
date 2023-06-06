import React from 'react';
import { Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { BsFillBasketFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Link, animateScroll as scroll } from 'react-scroll';

const CustomNavbar = () => {

  const handleScrollToTop = () => {
    scroll.scrollToTop({
      duration: 0,
      smooth: true
    });
  }

  const handleScrollToAbout = () => {
    scroll.scrollTo('about', {
      duration: 250,
      smooth: true
    })
  }

  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/Settings');
    console.log("Settings öğesi tıklandı!");
    // Ek olay işlemlerini buraya ekleyebilirsiniz
  };

  return (
    <Navbar className="navbar-expand-lg bg-body-tertiary">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <Nav className="navbar-nav mr-auto">
          <NavItem>
            <Link>
              <button onClick={handleScrollToTop} className="btn btn-link nav-link">Home</button>
            </Link>
          </NavItem>
          <NavItem>
            <Link>
              <button onClick={handleScrollToAbout} to="about" className="btn btn-link nav-link">About Us</button>
            </Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto">
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Profile
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={handleSettingsClick}>Settings</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Nav>
          <button className="btn btn-link nav-link">
            <BsFillBasketFill />
          </button>
        </Nav>
      </div>
    </Navbar>
  );
};

export default CustomNavbar;

//.navbar {
//   background-color: #your_color;
// }
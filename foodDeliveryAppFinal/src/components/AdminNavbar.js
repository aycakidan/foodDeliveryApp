import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import logo from "../logo.svg"
import "../index.css"
import { links } from "../utils.js";

const AdminNavbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks]);
  return (
    <NavigationElement>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo}  className='logo' alt='logo' />
          <button className='nav-toggle' onClick={toggleLinks}>
            +
          </button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
        
      </div>
    </NavigationElement>
  );
};




const NavigationElement = styled.nav`
  background-color: black;
  z-index: 2;
  width:100%;
  .nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}
.nav-toggle {
  font-size: 1.5rem;
  color: white;
  background: transparent;
  border-color: transparent;
  transition: var(--transition);
  cursor: pointer;
}
.nav-toggle:hover {
  color: red;
  transform: rotate(90deg);
}
.logo {
  height: 40px;
}
.links a {
  color: white;
  font-size: 1.2rem;
  text-transform: capitalize;
  letter-spacing: red;
  display: block;
  padding: 0.5rem 1rem;
  transition: all 0.3s linear;
}
.links a:hover {
  background: #B70304;
  
  padding-left: 1.5rem;
}
.social-icons {
  display: none;
}
.links-container {
  height: 0;
  overflow: hidden;
  transition: all 0.3s linear;
}
.show-container {
  height: 10rem;
}
@media screen and (min-width: 800px) {
  .nav-center {
    max-width: 1170px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }
  .nav-header {
    padding: 0;
  }
  .nav-toggle {
    display: none;
  }
  .links-container {
    height: auto !important;
  }
  .links {
    display: flex;
  }
  .links a {
    padding: 0;
    margin: 0 2rem;
  }
  .links a:hover {
    padding: 0;
    background: transparent;
  }
  .social-icons {
    display: flex;
  }
  .social-icons a {
    margin: 0 0.5rem;
    color: red;
    transition: all 0.3s linear;
  }
  
}

`


export default AdminNavbar;

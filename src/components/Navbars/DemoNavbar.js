/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  //InputGroupAddon,
  Input,
} from "reactstrap";
//import Login from "../../auth/Login.js";

import routes from "routes.js";

function Header(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const location = useLocation();
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);
  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={
        location.pathname.indexOf("full-screen-maps") !== -1 ? "dark" : color
      }
      expand="lg"
      className={
        location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
      /*style={{
        marginBottom: "0px", // Adjust this value to control the bottom margin
        paddingTop: "5px",   // Adjust this value to control the top padding
      }}*/
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="/" style={{ marginLeft: "7px"}}>{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
        
          <Nav navbar className="navbar-line">
            <NavItem className="navbar-icons">
              <Link to="#pablo" className="nav-link btn-magnify">
                <i className="nc-icon nc-layout-11" />
                <p>
                  <span className="d-lg-none d-md-block">Stats</span>
                </p>
              </Link>
            </NavItem>
            <Link to="#pablo" className="nav-link btn-rotate" style={{marginTop: "-65px"}}>
                <i className="nc-icon nc-bell-55" />
                <p>
                  <span className="d-lg-none d-md-block">Account</span>
                </p>
              </Link>
            <NavItem className="navbar-icons">
              <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
              style={{marginBottom: "-42px"}}
            >
              <DropdownToggle caret nav>
                <i className="nc-icon nc-settings-gear-65" />
                <p>
                  <span className="d-lg-none d-md-block">Some Actions</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to="/" style={{paddingBottom: "-25px"}}><i className="nc-icon nc-single-02" style={{paddingRight: "5px"}}></i> My Profile</DropdownItem>
                <DropdownItem tag={Link} to="/" style={{paddingBottom: "-25px"}}><i className="nc-icon nc-button-power" style={{paddingRight: "5px"}}></i> Log out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

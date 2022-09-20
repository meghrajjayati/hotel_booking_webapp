import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <img
            className="asc-logo"
            src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/wdssvw2kkzjjiagwckjf"
            alt="company-logo"
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav style={{ fontSize: "25px" }} className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/handlebooking">Retrieve/Delete Booking</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};
export default NavBar;

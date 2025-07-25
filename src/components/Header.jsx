import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm fixed-top w-100 m-0 p-0">
      <Container fluid className="px-4">
        <Navbar.Brand href="#">
          <img
            alt="logo"
            src="images/logo.png"
            width="200"
            height="50"
            className="d-inline-block align-top"
            style={{ marginLeft: '17rem' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ marginRight: '17rem' }}>
            <Nav.Link href="#services">Our Services</Nav.Link>
            <Nav.Link href="#about">About Us</Nav.Link>
            <Nav.Link href="#contact">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

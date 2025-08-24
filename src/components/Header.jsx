import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm fixed-top w-100 m-0 p-0">
      <Container fluid className="px-4">
        <Navbar.Brand href="#">
          <img
            alt="logo"
            src="images/logo.png"
            className="img-fluid"
            style={{ maxWidth: "200px", height: "auto" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ marginRight: '5rem' }}>
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/services'>Our Services</Nav.Link>
            <Nav.Link as={Link} to='/about-us'>About Us</Nav.Link>
            <Nav.Link as={Link} to='/contact_us'>Contact Us</Nav.Link>
            <Nav.Link as={Link} to='/auth'>Login/Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

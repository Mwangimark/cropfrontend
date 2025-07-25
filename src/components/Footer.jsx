// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/logo.png'; // adjust if needed
import { FaTwitter, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-1">
      <Container>
        <Row>
          {/* Column 1: Brand */}
          <Col md={3} sm={6} className="mb-4">
            <img src={logo} alt="AgriFit Logo" width="120" className="mb-2" />
            <h5 className="mb-2">AgriFit</h5>
            <p>Smart agriculture solutions for a sustainable future.</p>
          </Col>

          {/* Column 2: Quick Links */}
          <Col md={3} sm={6} className="mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Home</a></li>
              <li><a href="#" className="text-white text-decoration-none">Services</a></li>
              <li><a href="#" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="#" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </Col>

          {/* Column 3: Social Media */}
          <Col md={3} sm={6} className="mb-4">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3 fs-5">
              <a href="#" className="text-white"><FaTwitter /></a>
              <a href="#" className="text-white"><FaFacebook /></a>
              <a href="#" className="text-white"><FaLinkedin /></a>
              <a href="#" className="text-white"><FaYoutube /></a>
            </div>
          </Col>

          {/* Column 4: Contact */}
          <Col md={3} sm={6} className="mb-4">
            <h5>Contact</h5>
            <p>Email: support@agrifit.com</p>
            <p>Phone: +254 712 345 678</p>
            <p>Address: Nairobi, Kenya</p>
          </Col>
        </Row>

        <hr className="border-light" />
        <div className="text-center">
          <p className="mb-1">&copy; {new Date().getFullYear()} AgriFit. All rights reserved.</p>
          <small>Built for smart agriculture solutions.</small>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

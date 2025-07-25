// src/components/HeroSection.js
import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const backgroundStyle = {
    backgroundImage: "url('/images/farm-bg.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '75vh',
    color: 'white',
    display: 'flex',
    alignItems: 'center'
  };

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div style={backgroundStyle}>
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="display-4 fw-bold mb-4">Grow Smart with AgriFit</h1>
            <p className="lead mb-4">
              Get personalized crop recommendations based on your soil and environment.
            </p>
            <Button onClick={handleGetStarted} variant="success" size="lg">
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HeroSection;

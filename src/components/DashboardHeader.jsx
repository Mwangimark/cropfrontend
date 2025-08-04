import React from 'react';
import { Container, Row, Col, Dropdown, Nav } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const DashboardHeader = ({ user }) => {
    const navigate = useNavigate();

    return (
        <header className="bg-success text-white py-2 shadow-sm fixed-top">
            <Container fluid>
                <Row className="align-items-center justify-content-between px-3">

                    {/* Logo */}
                    <Col xs={12} md="auto" className="text-center text-md-start mb-2 mb-md-0">
                        <img
                            src="/assets/logo.png"
                            alt="logo"
                            width="200"
                            height="50"
                            className="d-inline-block align-top"
                        />
                    </Col>

                    {/* Navigation Links */}
                    <Col xs={12} md className="text-center mb-2 mb-md-0">
                        <Nav className="justify-content-center justify-content-md-end">
                            <Nav.Item>
                                <Link to="/dashboard" className="nav-link text-white fw-semibold">Home</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to="/contact" className="nav-link text-white fw-semibold">Contact Us</Link>
                            </Nav.Item>
                        </Nav>
                    </Col>

                    {/* User Dropdown */}
                    <Col xs={12} md="auto" className="text-center text-md-end">
                        <Dropdown align="end">
                            <Dropdown.Toggle
                                variant="outline-primary"
                                className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm mx-auto mx-md-0"
                                style={{ backgroundColor: '#f8f9fa', border: '1px solid #ccc' }}
                            >
                                <FaUserCircle size={24} />
                                <span className="fw-medium">{user?.name}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="shadow-sm">
                                <Dropdown.Item>Profile</Dropdown.Item>
                                <Dropdown.Item>Settings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className="text-danger" onClick={() => navigate('/auth')}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default DashboardHeader;

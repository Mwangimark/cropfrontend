import React, { useState } from 'react';
import { Container, Row, Col, Dropdown, Nav } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ProfileModal from '../pages/ProfileModal';

const DashboardHeader = ({ user }) => {
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);

    return (
        <>
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
                                    <Link to="/more_info" className="nav-link text-white fw-semibold">More Info</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link to="/crops" className="nav-link text-white fw-semibold">Crops Identity</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link to="" className="nav-link text-white fw-semibold">Chat bot</Link>
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
                                    {user?.image ? (
                                        <img
                                            src={user.image}
                                            alt="Profile"
                                            className="rounded-circle"
                                            style={{
                                                width: 28,
                                                height: 28,
                                                objectFit: "cover",
                                            }}
                                        />
                                    ) : (
                                        <FaUserCircle size={24} />
                                    )}
                                    <span className="fw-medium">{user?.name}</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="shadow-sm">
                                    <Dropdown.Item onClick={() => setShowProfile(true)}>Profile</Dropdown.Item>
                                    <Dropdown.Item>Settings</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        className="text-danger"
                                        onClick={() => {
                                            localStorage.removeItem('token'); 
                                            sessionStorage.removeItem('token'); 
                                
                                            navigate('/auth');
                                        }}
                                    >
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                    </Row>
                </Container>
            </header>
            <ProfileModal
                isOpen={showProfile}
                onClose={() => setShowProfile(false)}
                user={user}
            />
        </>
    );
};

export default DashboardHeader;

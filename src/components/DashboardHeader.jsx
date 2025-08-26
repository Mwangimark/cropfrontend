import React, { useState } from 'react';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ProfileModal from '../pages/ProfileModal';

const DashboardHeader = ({ user }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <Navbar
        expand="md"
        bg="success"
        variant="dark"
        fixed="top"
        className="shadow-sm"
      >
        <Container fluid>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/dashboard">
            <img
              src="/assets/logo.png"
              alt="logo"
              width="160"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          {/* Hamburger toggle for mobile */}
          <Navbar.Toggle aria-controls="main-navbar" />

          {/* Collapsible menu */}
          <Navbar.Collapse id="main-navbar" className="justify-content-between">
            {/* Navigation Links */}
            <Nav className="mx-auto text-center">
              <Nav.Link as={Link} to="/dashboard" className="fw-semibold">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/more_info" className="fw-semibold">
                More Info
              </Nav.Link>
              <Nav.Link as={Link} to="/crops" className="fw-semibold">
                Crops Identity
              </Nav.Link>
              <Nav.Link as={Link} to="/chatbot" className="fw-semibold">
                Chat bot
              </Nav.Link>
            </Nav>

            {/* User Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="light"
                className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm"
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
                <span className="fw-medium d-none d-sm-inline">
                  {user?.name}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow-sm">
                <Dropdown.Item onClick={() => setShowProfile(true)}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="text-danger"
                  onClick={() => {
                    localStorage.removeItem("token");
                    sessionStorage.removeItem("token");
                    navigate("/auth");
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        user={user}
      />
    </>
  );
};

export default DashboardHeader;

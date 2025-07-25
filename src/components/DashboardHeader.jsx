// components/DashboardHeader.js
import React from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const DashboardHeader = ({ user }) => {
     const navigate = useNavigate();
    return (
        <Row className="align-items-center  justify-content-between py-2 shadow-sm rounded bg-success text-white" style= {{paddingLeft: '20rem'}}>
            <Col xs="auto">
                <img
                    src="/assets/logo.png"
                    alt="logo"
                    width="200"
                    height="50"
                    className="d-inline-block align-top"
                />
            </Col>

            <Col xs="auto" style= {{paddingRight: '20rem'}}>
                <Dropdown align="end">
                    <Dropdown.Toggle
                        variant="outline-primary"
                        className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm"
                        style={{ backgroundColor: '#f8f9fa', border: '1px solid #ccc' }}
                    >
                        <FaUserCircle size={24} />
                        <span className="fw-medium">{user?.name}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="shadow-sm">
                        <Dropdown.Item>Profile</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-danger"onClick={()=> navigate('/auth')} >Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    );
};

export default DashboardHeader;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../components/Dashboard.css' // Optional for custom styles
import Footer from '../components/Footer';
import DashboardHeader from '../components/DashboardHeader';
import axiosInstance from '../api/axiosInstance';

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        try {
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (err) {
            console.warn("Invalid stored user in localStorage:", storedUser);
            localStorage.removeItem('user'); // Clean up corrupted data
        }
    }, []);

    const cropPredictions = [
        {
            name: 'Maize',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTHOasUeqJ_ZGX-MMEJGlX8HduGaW4ufsaAA&s',
            description: 'Best suited for your soil and climate.',
        },
        {
            name: 'Beans',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTHOasUeqJ_ZGX-MMEJGlX8HduGaW4ufsaAA&s',
            description: 'Great yield expected in current conditions.',
        },
        {
            name: 'Cassava',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTHOasUeqJ_ZGX-MMEJGlX8HduGaW4ufsaAA&s',
            description: 'Strong resistance to drought and pests.',
        },
    ];

    const userInputs = {
        ph: 6.5,
        moisture: 'High',
        temperature: '27°C',
        soilType: 'Loamy',
        rainfall: 'Moderate',
    };

    return (
        <>
            <div style={{ maxWidth: '100%' }}>
                <DashboardHeader user={user} /></div>
            {/* btn predict crop */}
            <div className="dashboard-bg " >
                <div className="d-flex justify-content-end  mb-2">
                    <button style={{ marginRight: '20rem' }}
                        className="btn btn-success px-4 py-2 rounded-pill mt-2"
                        onClick={() => window.location.href = "/predict"}
                    >
                        Predict Crop
                    </button>
                </div>


                <h4
                    className="fw-bold ps-4 border-start border-3 border-light mb-4"
                    style={{ color: 'white', marginLeft: '20rem' }}
                >
                    &nbsp;Recent Crop Predictions
                </h4>



                <Container fluid className="py-4 px-3 d-flex justify-content-center" >

                    {/* Hero Section */}


                    <div className="prediction-section shadow-sm p-4 mt-3 mb-5">
                        <Row className="g-4 mt-3">
                            {cropPredictions.map((crop, index) => (
                                <Col md={3} key={index}>
                                    <Card className="h-100 shadow-sm crop-card">
                                        <Card.Img variant="top" src={crop.image} height="150" style={{ objectFit: 'cover' }} />
                                        <Card.Body>
                                            <Card.Title>{crop.name}</Card.Title>
                                            <Card.Text>{crop.description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}

                            <Col md={3}>
                                <Card className="h-100 shadow-sm input-card">
                                    <Card.Body>
                                        <Card.Title>User Input Summary</Card.Title>
                                        <hr />
                                        {Object.entries(userInputs).map(([key, value], i) => (
                                            <p key={i}>
                                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                            </p>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="g-4 mt-3">
                            {cropPredictions.map((crop, index) => (
                                <Col md={3} key={index}>
                                    <Card className="h-100 shadow-sm crop-card">
                                        <Card.Img variant="top" src={crop.image} height="150" style={{ objectFit: 'cover' }} />
                                        <Card.Body>
                                            <Card.Title>{crop.name}</Card.Title>
                                            <Card.Text>{crop.description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}

                            <Col md={3}>
                                <Card className="h-100 shadow-sm input-card">
                                    <Card.Body>
                                        <Card.Title>User Input Summary</Card.Title>
                                        <hr />
                                        {Object.entries(userInputs).map(([key, value], i) => (
                                            <p key={i}>
                                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                            </p>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <Footer />
            </div>
        </>
    );
}

export default Dashboard;

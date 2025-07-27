import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../components/Dashboard.css';
import Footer from '../components/Footer';
import DashboardHeader from '../components/DashboardHeader';
import { getPastPredictions } from '../api/predictapi';

function Dashboard({ user }) {
    const [recommendations, setRecommendations] = useState([]);
    console.log(user)

    useEffect(() => {
        async function fetchPredictions() {
            try {
                const response = await getPastPredictions();
                if (Array.isArray(response)) {
                    setRecommendations(response);
                    console.log(response) // Save entire list
                } else {
                    console.warn("Unexpected format from prediction API");
                }
            } catch (error) {
                console.error("Error fetching past predictions:", error);
            }
        }

        fetchPredictions();
    }, []);

    return (
        <>
            <DashboardHeader user={user} />
            <div className="dashboard-bg">
                <div className="d-flex justify-content-end mb-2">
                    <button
                        style={{ marginRight: '20rem' }}
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

                <Container fluid className="py-4 px-3 d-flex flex-column align-items-center">
                    {recommendations.map((rec, idx) => (
                        <div key={idx} className="prediction-section shadow-sm p-4 mb-5" style={{ width: '85%' }}>
                            <Row className="g-4 mb-3">
                                {rec.predicted_crops.map((crop, index) => (
                                    <Col md={3} key={index}>
                                        <Card className="h-100 shadow-sm crop-card">
                                            <Card.Img variant="top" src={crop.image} height="150" style={{ objectFit: 'cover' }} />
                                            <Card.Body>
                                                <Card.Title>{crop.name}</Card.Title>
                                                <Card.Text>{crop.description}</Card.Text>
                                                <span className="badge bg-success">
                                                    Confidence: {Math.round(crop.confidence * 100)}%
                                                </span>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}

                                <Col md={3}>
                                    <Card className="h-100 shadow-sm input-card">
                                        <Card.Body>
                                            <Card.Title>User Input Summary</Card.Title>
                                            <hr />
                                            <p><strong>Nitrogen:</strong> {rec.nitrogen}</p>
                                            <p><strong>Phosphorus:</strong> {rec.phosphorus}</p>
                                            <p><strong>Potassium:</strong> {rec.potassium}</p>
                                            <p><strong>Temperature:</strong> {rec.temperature} °C</p>
                                            <p><strong>Humidity:</strong> {rec.humidity} %</p>
                                            <p><strong>pH:</strong> {rec.ph}</p>
                                            <p><strong>Rainfall:</strong> {rec.rainfall} mm</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </Container>

                <Footer />
            </div>
        </>
    );
}

export default Dashboard;

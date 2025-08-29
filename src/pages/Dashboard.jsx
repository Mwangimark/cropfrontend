import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../components/cssFiles/Dashboard.css';
import Footer from '../components/Footer';
import DashboardHeader from '../components/DashboardHeader';
import { deletePrediction, getPastPredictions } from '../api/predictapi';

function Dashboard({ user }) {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        async function fetchPredictions() {
            try {
                const response = await getPastPredictions();
                if (Array.isArray(response)) {
                    setRecommendations(response);
                } else {
                    console.warn("Unexpected format from prediction API");
                }
            } catch (error) {
                console.error("Error fetching past predictions:", error);
            }
        }

        fetchPredictions();
    }, []);

    const handleDeletePrediction = async (id) => {
        const response = await deletePrediction(id);
        if (response) {
            setRecommendations(recommendations.filter(rec => rec.id !== id));
        } else {
            alert("Failed to delete prediction. Please try again.");
        }
    };

    return (
        <>
            <DashboardHeader user={user} />
            <div
                className="dashboard-bg d-flex flex-column min-vh-100"
                style={{ marginTop: "4.05rem" }}
            >
                <Container fluid className="py-4 px-3 d-flex flex-column container">
                    {/* Header Row with Title + Button */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                        <h4
                            className="fw-bold ps-4 border-start border-3 border-light mb-3 mb-md-0"
                            style={{ color: 'black' }}
                        >
                            &nbsp;Recent Crop Predictions
                        </h4>

                        <button
                            className="btn btn-success px-4 py-2 rounded-pill"
                            onClick={() => (window.location.href = '/predict')}
                        >
                            Predict Crop
                        </button>
                    </div>

                    {/* Predictions */}
                    {recommendations.length === 0 ? (
                        <div className="text-center text-light mt-5">
                            <h4>No predictions made yet.</h4>
                            <p>
                                Click the <strong>Predict Crop</strong> button above to get started.
                            </p>
                        </div>
                    ) : (
                        recommendations.map((rec, idx) => (
                            <div key={idx} className="prediction-section shadow-sm p-4 mb-5">
                                <Row className="g-4 mb-3">
                                    {rec.predicted_crops.map((crop, index) => (
                                        <Col
                                            key={index}
                                            xs={6}
                                            sm={4}
                                            md={3}
                                            lg={3}
                                        >
                                            <CropCard crop={crop} />
                                        </Col>
                                    ))}

                                    <Col xs={6} sm={4} md={3} lg={3}>
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
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => handleDeletePrediction(rec.id)}
                                            >
                                                Delete
                                            </button>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        ))
                    )}
                </Container>
            </div>


            <Footer />

        </>
    );
}

/**
 * CropCard component
 * - On phones (<768px): show short description with "Read More / Less"
 * - On tablets/laptops (≥768px): show full description always
 */
const CropCard = ({ crop }) => {
    const [expanded, setExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768); // phone breakpoint
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Always show full description on tablet/laptop
    if (!isMobile) {
        return (
            <Card className="h-100 shadow-sm crop-card">
                <Card.Img
                    variant="top"
                    src={crop.image_url}
                    style={{
                        height: '250px',
                        width: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
                <Card.Body>
                    <Card.Title>{crop.name}</Card.Title>
                    <Card.Text>{crop.description}</Card.Text>
                    <span className="badge bg-success d-block mt-2">
                        Confidence: {Math.round(crop.confidence * 100)}%
                    </span>
                </Card.Body>
            </Card>
        );
    }

    // On phones → show Read More / Less
    const shortText =
        crop.description && crop.description.length > 60
            ? crop.description.substring(0, 60) + "..."
            : crop.description;

    return (
        <Card className="h-100 shadow-sm crop-card">
            <Card.Img
                variant="top"
                src={crop.image_url}
                style={{
                    height: '250px',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
            />
            <Card.Body className="d-flex flex-column">
                <div>
                    <Card.Title>{crop.name}</Card.Title>
                    <Card.Text>
                        {expanded ? crop.description : shortText}
                    </Card.Text>
                    {crop.description && crop.description.length > 60 && (
                        <button
                            className="btn btn-link p-0"
                            style={{ fontSize: '0.9rem' }}
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? "Read Less" : "Read More"}
                        </button>
                    )}
                </div>

                {/* This part stays pinned at bottom */}
                <div className="mt-auto">
                    <span className="badge bg-success d-block mt-2">
                        Confidence: {Math.round(crop.confidence * 100)}%
                    </span>
                </div>
            </Card.Body>
        </Card>

    );
};

export default Dashboard;

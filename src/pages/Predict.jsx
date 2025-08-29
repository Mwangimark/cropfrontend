// src/components/PredictForm.jsx
import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import DashboardHeader from '../components/DashboardHeader';
import Footer from '../components/Footer';
import { predictCrops } from '../api/predictapi';
import Loading from '../components/Loading';

const PredictForm = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    rainfall: '',
    temperature: '',
    humidity: '',
  });

  const [showPrediction, setShowPrediction] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [userInputs, setUserInputs] = useState({ ...formData });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    try {
      setUserInputs({ ...formData });
      setLoading(true);
      const result = await predictCrops(formData);

      if (result && result.predicted_crops) {
        setPredictions(result.predicted_crops);
        setShowPrediction(true);
      } else {
        alert("Prediction failed. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred while predicting crops:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowPrediction(false);
    setFormData({
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      ph: '',
      rainfall: '',
      temperature: '',
      humidity: '',
    });
    setPredictions([]);
  };

  return (
    <>
      <DashboardHeader user={user} />
      <h2 className="text-center mt-4">Crop Prediction</h2>
      <div className="predict-bg py-2">
        {/* Input Form */}
        <Card className="p-4 shadow-sm" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Form onSubmit={(e) => e.preventDefault()}>
            {[
              { label: 'Nitrogen', name: 'nitrogen' },
              { label: 'Phosphorus', name: 'phosphorus' },
              { label: 'Potassium', name: 'potassium' },
              { label: 'pH', name: 'ph', step: 0.1 },
              { label: 'Rainfall (mm)', name: 'rainfall', step: 0.1 },
              { label: 'Temperature (°C)', name: 'temperature', step: 0.1 },
              { label: 'Humidity (%)', name: 'humidity', step: 0.1 },
            ].map((input, idx) => (
              <Form.Group className="mb-3" key={idx}>
                <Form.Label>{input.label}</Form.Label>
                <Form.Control
                  type="number"
                  name={input.name}
                  step={input.step || 1}
                  value={formData[input.name]}
                  onChange={handleChange}
                  disabled={showPrediction}
                  required
                />
              </Form.Group>
            ))}

            <div className="text-center">
              <Button type="submit" variant="success" onClick={handlePredict}>
                Predict
              </Button>
              {loading && (
                <>
                  <h5 className="mt-3">Please hold on... Prediction in progress</h5>
                  <Loading />
                </>
              )}
            </div>
          </Form>
        </Card>

        {/* Predictions */}
        {showPrediction && (
          <div className="mt-5 container">
            <h4 className="text-center mb-4">Prediction Results</h4>
            <Row className="g-4">
              {/* Prediction Cards */}
              {predictions.map((crop, index) => (
                <Col xs={12} sm={6} md={4} lg={3} key={index}>
                  <CropCard crop={crop} />
                </Col>
              ))}

              {/* User Input Summary */}
              <Col xs={12} sm={6} md={4} lg={3}>
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

            <div className="d-flex justify-content-center gap-4 mt-4">
              <button type="button" className="btn btn-secondary" onClick={handleBack}>
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

/**
 * CropCard Component
 * - Keeps confidence badge pinned at bottom
 * - Shows "Read More / Read Less" only if description is long
 * - Truncates description on mobile only
 */
const CropCard = ({ crop }) => {
  const [expanded, setExpanded] = useState(false);

  const shortText =
    crop.description && crop.description.length > 80
      ? crop.description.substring(0, 80) + "..."
      : crop.description;

  return (
    <Card className="h-100 shadow-sm crop-card">
      <Card.Img
        variant="top"
        src={crop.image_url}
        style={{
          height: "250px",
          width: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <Card.Body className="d-flex flex-column">
        <div>
          <Card.Title>{crop.name}</Card.Title>
          <Card.Text className="d-none d-md-block">{crop.description}</Card.Text>
          <Card.Text className="d-block d-md-none">
            {expanded ? crop.description : shortText}
          </Card.Text>

          {crop.description && crop.description.length > 80 && (
            <button
              className="btn btn-link p-0 d-block d-md-none"
              style={{ fontSize: "0.9rem" }}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>

        <div className="mt-auto">
          <span className="badge bg-success d-block mt-2">
            Confidence: {Math.round(crop.confidence * 100)}%
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PredictForm;

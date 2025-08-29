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
  const [Predictions, setPredictions] = useState([]);
  const [userInputs, setUserInputs] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    try {
      setUserInputs({ ...formData }); 
      setLoading(true);
      const result = await predictCrops(formData);

      if (result && result.predicted_crops) {
        setPredictions(result.predicted_crops); // note the variable is capitalized incorrectly now
        setShowPrediction(true);
        setLoading(false);
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
      temperature: '',
      humidity: '',
      ph: '',
      rainfall: '',
    });
    setPredictions([]);
  };

  return (
    <>
      <DashboardHeader user={user} />
      <h2 className="text-center mt-4">Crop Prediction</h2>
      <div className='predict-bg py-2'>
        <Card className="p-4 shadow-sm" style={{ maxWidth: '500px', margin: '0px auto' }}>
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
              {loading && <><h5> Please hold on .... Predicting in action </h5><Loading /></>}
            </div>
          </Form>
        </Card>

        {showPrediction && (
          <div className="mt-5 container">
            <h4 className="text-center mb-4">Prediction Results</h4>
            <Row className="g-4 flex-column flex-md-row"> {/* Stack on xs/sm, row on md+ */}
              {/* Predictions */}
              {Predictions.map((crop, index) => (
                <Col xs={12} md={3} key={index}>
                  <Card className="h-100 shadow-sm crop-card">
                    <Card.Img
                      variant="top"
                      src={crop.image_url}
                      height="250"
                      style={{ objectFit: 'cover' }}
                    />
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

              {/* User Input Summary */}
              <Col xs={12} md={3}>
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
}

export default PredictForm;

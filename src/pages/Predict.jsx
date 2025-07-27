// src/components/PredictForm.jsx
import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import DashboardHeader from '../components/DashboardHeader';
import Footer from '../components/Footer';
import { predictCrops } from '../api/predictapi';

const PredictForm = ({user}) => {
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
    setUserInputs({ ...formData }); // ✅ Capture inputs first

    const result = await predictCrops(formData);

    if (result && result.predicted_crops) {
      setPredictions(result.predicted_crops); // note the variable is capitalized incorrectly now
      setShowPrediction(true);
    } else {
      alert("Prediction failed. Please try again.");
    }
  };



  return (
    <>
      <DashboardHeader user={user} />
      <div className='predict-bg py-5'>
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
                  required
                />
              </Form.Group>
            ))}

            <div className="text-center">
              <Button type="submit" variant="success" onClick={handlePredict}>
                Predict
              </Button>
            </div>
          </Form>
        </Card>

        {showPrediction && (
          <div className="mt-5 container">
            <h4 className="text-center mb-4">Prediction Results</h4>
            <Row className="g-4">
              {Predictions.map((crop, index) => (
                <Col md={3} key={index}>
                  <Card className="h-100 shadow-sm crop-card">
                    <Card.Img variant="top" src= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTHOasUeqJ_ZGX-MMEJGlX8HduGaW4ufsaAA&s'
                     height="150" 
                     style={{ objectFit: 'cover' }} />
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
            <div className="flex justify-center gap-4 mt-4" style={{ margin: '10 auto' }}>
              {/* Go Back - primary green */}
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
                onClick={() => setShowPrediction(false)}
              >
                Go Back
              </button>

              {/* Save Results - secondary gray */}
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded"
                onClick={() => alert('Saving... (not yet implemented)')}
              >
                Save Results
              </button>
            </div>
          </div>

        )}



      </div>
      <Footer />
    </>
  );
};

export default PredictForm;

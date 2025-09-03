// src/components/PredictForm.jsx
import React, { useState } from "react";
import { Form, Button, Card, Row, Col, ProgressBar } from "react-bootstrap";
import DashboardHeader from "../components/DashboardHeader";
import Footer from "../components/Footer";
import { predictCrops } from "../api/predictapi";
import Loading from "../components/Loading";
import GuideNote from "../components/GuideNote";


const PredictForm = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    rainfall: "",
    temperature: "",
    humidity: "",
  });

  const [showPrediction, setShowPrediction] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [userInputs, setUserInputs] = useState({ ...formData });
  const [status, setStatus] = useState(null);
  const [progress, setProgress] = useState(0);

  const statusSteps = [
    "🔍 Analyzing Input",
    "⚡ Running Prediction",
    "⏳ Almost Done",
    "🎉 Prediction Successful",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    // Validation rules
    const rules = {
      nitrogen: { min: 0, max: 140 },
      phosphorus: { min: 0, max: 100 },
      potassium: { min: 0, max: 200 },
      ph: { min: 3, max: 9 },
      rainfall: { min: 0, max: 5000 },
      temperature: { min: -10, max: 50 },
      humidity: { min: 0, max: 100 },
    };

    // Validate inputs
    for (const [key, { min, max }] of Object.entries(rules)) {
      const value = parseFloat(formData[key]);
      if (isNaN(value) || value < min || value > max) {
        alert(
          `${key.charAt(0).toUpperCase() + key.slice(1)} must be between ${min} and ${max}`
        );
        return; // stop prediction
      }
    }

    try {
      setUserInputs({ ...formData });
      setShowPrediction(false);
      setPredictions([]);
      setStatus(statusSteps[0]);
      setProgress(25);
      setLoading(true);

      const apiPromise = predictCrops(formData);

      let stepIndex = 0;
      const interval = setInterval(() => {
        stepIndex++;
        if (stepIndex < statusSteps.length) {
          setStatus(statusSteps[stepIndex]);
          setProgress((stepIndex + 1) * 25);
        } else {
          clearInterval(interval);
        }
      }, 3000);

      const [result] = await Promise.all([
        apiPromise,
        new Promise((resolve) => setTimeout(resolve, statusSteps.length * 3000)),
      ]);

      if (result && result.predicted_crops) {
        setStatus("🎉 Prediction Successful");
        setProgress(100);
        setPredictions(result.predicted_crops);
        setShowPrediction(true);
      } else {
        setStatus("❌ Failed");
        setProgress(0);
        alert("Prediction failed. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred while predicting crops:", error);
      setStatus("❌ Error");
      setProgress(0);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };



  const handleBack = () => {
    setShowPrediction(false);
    setFormData({
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      ph: "",
      rainfall: "",
      temperature: "",
      humidity: "",
    });
    setPredictions([]);
    setStatus(null);
    setProgress(0);
  };

  return (
    <>
      <DashboardHeader user={user} />
      <h2 className="text-center mt-4">🌱 Crop Prediction</h2>
      <div className="predict-bg py-2">
        {/* Input Form */}
        {!showPrediction && (
          <Row className="mt-0 g-4 justify-content-center align-items-start" >

            {/* Right - Prediction Form */}
            <Col md={4} >
              <Card
                className="p-2 shadow-sm"
                style={{ maxWidth: "700px", margin: "0 auto", }}
              >
                <Form onSubmit={(e) => e.preventDefault()} style={{ Height: "30vh" }}>
                  {[
                    { label: "Nitrogen (kg/ha)", name: "nitrogen", min: 0, max: 140, placeholder: "e.g. 60" },
                    { label: "Phosphorus (kg/ha)", name: "phosphorus", min: 0, max: 100, placeholder: "e.g. 40" },
                    { label: "Potassium (kg/ha)", name: "potassium", min: 0, max: 200, placeholder: "e.g. 50" },
                    { label: "Soil pH", name: "ph", step: 0.1, min: 3, max: 9, placeholder: "e.g. 6.5" },
                    { label: "Rainfall (mm)", name: "rainfall", step: 0.1, min: 0, max: 5000, placeholder: "e.g. 1200" },
                    { label: "Temperature (°C)", name: "temperature", step: 0.1, min: -10, max: 50, placeholder: "e.g. 25" },
                    { label: "Humidity (%)", name: "humidity", step: 0.1, min: 0, max: 100, placeholder: "e.g. 70" },
                  ].map((input, idx) => (
                    <Form.Group className="mb-3" key={idx}>
                      <Form.Label>{input.label}</Form.Label>
                      <Form.Control
                        type="number"
                        name={input.name}
                        step={input.step || 1}
                        min={input.min}
                        max={input.max}
                        placeholder={input.placeholder}
                        value={formData[input.name]}
                        onChange={handleChange}
                        disabled={loading}
                        required
                      />
                    </Form.Group>
                  ))}

                  <div className="text-center">
                    <Button
                      type="submit"
                      variant="success"
                      onClick={handlePredict}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Predict"}
                    </Button>
                  </div>
                </Form>

                {/* Status Progress */}
                {loading && (
                  <div className="mt-4 text-center">
                    <h5>{status}</h5>
                    <ProgressBar
                      now={progress}
                      striped
                      animated
                      variant="success"
                      className="my-3"
                    />
                    <Loading />
                  </div>
                )}
              </Card>
            </Col>
            {/* Right - Guide Note */}
            <Col md={4}>
              <Card
                className="p-3 shadow-sm h-100"
                style={{ height: "100%", fontSize: "0.95rem" }}
              >
                <GuideNote />
              </Card>
            </Col>
          </Row>
        )}

        {/* Predictions */}
        {showPrediction && (
          <div className="mt-5 container animate__animated animate__fadeIn">
            <h4 className="text-center mb-4">🌾 Prediction Results</h4>
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
                        <strong>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </strong>{" "}
                        {value}
                      </p>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="d-flex justify-content-center gap-4 mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleBack}
              >
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
 */
const CropCard = ({ crop }) => {
  const [expanded, setExpanded] = useState(false);

  const shortText =
    crop.description && crop.description.length > 80
      ? crop.description.substring(0, 80) + "..."
      : crop.description;

  return (
    <Card className="h-100 shadow-sm crop-card animate__animated animate__fadeInUp">
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

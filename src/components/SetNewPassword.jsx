import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ useLocation added
import axios from "axios";
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Header from "./Header";
import Footer from "./Footer";
import { API_BASE_URL } from "../api/auth";

const SetNewPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // get email from navigation

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("danger");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/set-password/`, {
        email,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      setMessage(res.data.message);
      setVariant("success");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => navigate("/auth"), 3000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error setting password");
      setVariant("danger");
    }
  };

  return (
    <>
    <Header/>
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-lg p-4 rounded">
            <h3 className="text-center mb-4">Set New Password</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formNewPassword">
                <Form.Label>New Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showNew ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <Button variant="outline-secondary" onClick={() => setShowNew(!showNew)}>
                    {showNew ? <EyeSlash /> : <Eye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button variant="outline-secondary" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <EyeSlash /> : <Eye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Reset Password
              </Button>
            </Form>

            {message && (
              <Alert variant={variant} className="mt-3 text-center">
                {message}
                {variant === "success" && <div>Redirecting to login...</div>}
              </Alert>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
};

export default SetNewPassword;

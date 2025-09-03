import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row, Card } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { updateUserProfile } from "../api/predictapi";

const ProfileModal = ({ isOpen, onClose, user, setUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        phone: "",
        image: null
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                role: user.role || "",
                phone: user.phone || "",
                image: user.image || null
            });
        }
    }, [user]);

    const handleEditClick = async () => {
        if (isEditing) {
            const form = new FormData();
            form.append("name", formData.name);
            form.append("phone", formData.phone);
            if (formData.image) {
                form.append("image", formData.image);
            }
            const updatedUser = await updateUserProfile(user.id, form);

            if (updatedUser) {
                alert("Profile updated successfully!");
                if (typeof setUser === "function") setUser(updatedUser);

                localStorage.setItem("user", JSON.stringify(updatedUser));
                window.location.reload();
            } else {
                alert("Failed to update profile. Please try again.");
            }
        }
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered size="md">
            <Modal.Header closeButton className="border-0">
                <Modal.Title className="fw-bold">👤 User Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card className="shadow-sm border-0 rounded-4 p-3">
                    <div className="text-center mb-4">
                        {formData.image ? (
                            <img
                                src={
                                    typeof formData.image === "string"
                                        ? formData.image
                                        : URL.createObjectURL(formData.image)
                                }
                                alt="Profile"
                                className="rounded-circle border shadow-sm"
                                style={{
                                    width: 100,
                                    height: 100,
                                    objectFit: "cover",
                                    transition: "0.3s",
                                }}
                            />
                        ) : (
                            <FaUserCircle
                                size={80}
                                className="mb-2 text-secondary"
                            />
                        )}

                        {isEditing && (
                            <Form.Group className="mt-3">
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
                                    name="image"
                                    className="form-control-sm"
                                />
                            </Form.Group>
                        )}
                    </div>

                    <Form>
                        <Form.Group as={Row} className="mb-3 align-items-center">
                            <Form.Label column sm={3} className="fw-semibold">
                                Username
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    className={isEditing ? "bg-light" : "border-0"}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 align-items-center">
                            <Form.Label column sm={3} className="fw-semibold">
                                Email
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    readOnly
                                    plaintext
                                    className="text-muted"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 align-items-center">
                            <Form.Label column sm={3} className="fw-semibold">
                                Role
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    readOnly
                                    plaintext
                                    className="text-muted"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-2 align-items-center">
                            <Form.Label column sm={3} className="fw-semibold">
                                Phone
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    className={isEditing ? "bg-light" : "border-0"}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Card>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between border-0">
                <Button
                    variant={isEditing ? "success" : "primary"}
                    onClick={handleEditClick}
                    className="px-4 rounded-3"
                >
                    {isEditing ? "💾 Save" : "✏️ Edit"}
                </Button>
                <Button variant="outline-secondary" onClick={onClose} className="px-4 rounded-3">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;

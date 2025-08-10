import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
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
    console.log(user)
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
                form.append("image", formData.image); // actual file
            }
            const updatedUser = await updateUserProfile(user.id, form);

            if (updatedUser) {
                alert("Profile updated successfully!");


                if (typeof setUser === "function") {
                    setUser(updatedUser);
                }

                // ✅ Update localStorage
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
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>User Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center mb-3">
                    {formData.image ? (
                        // Show uploaded image preview or user's saved image
                        <img
                            src={
                                typeof formData.image === "string"
                                    ? formData.image // if it's already a URL from backend
                                    : URL.createObjectURL(formData.image) // if it's a new file
                            }
                            alt="Profile"
                            className="rounded-circle mb-2"
                            style={{ width: 80, height: 80, objectFit: "cover" }}
                        />
                    ) : (
                        <FaUserCircle size={50} className="mb-2 text-secondary" />
                    )}

                    {isEditing && (
                        <Form.Group className="mt-2">
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
                                name="image"
                            />
                        </Form.Group>
                    )}
                </div>


                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Username:</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                readOnly={!isEditing}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Email:</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name="email"
                                value={formData.email}
                                readOnly
                                plaintext
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Role:</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name="role"
                                value={formData.role}
                                readOnly
                                plaintext
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Phone:</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                readOnly={!isEditing}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button variant={isEditing ? "success" : "primary"} onClick={handleEditClick}>
                    {isEditing ? "Save" : "Edit"}
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default ProfileModal;
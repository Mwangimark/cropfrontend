import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import teamImg from "../assets/tt.png"; // project image placeholder
import developerImg from "../assets/tt.png"; // your developer image
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FaLinkedin, FaGithub, FaEnvelope, FaTwitter, FaPhone } from "react-icons/fa";
import "../components/cssFiles/AboutUs.css";
import { motion } from "framer-motion";


const AboutUs = () => {
    const projects = [
        {
            title: "Companies Share Prediction",
            description: "AI-powered prediction system for company shares.",
            link: "https://github.com/Mwangimark/CompaniesSharePrediction",
        },
        {
            title: "Cholera Outbreak Prediction",
            description: "ML model predicting cholera outbreaks using health & environmental data.",
            link: "https://github.com/Mwangimark/CholeraPrediction",
        },
        {
            title: "Visitors Management Gate",
            description: "Django system managing visitors efficiently.",
            link: "https://github.com/Mwangimark/VisitorGate",
        },
    ];

    return (
        <>
            <Header />

            {/* Hero Section */}
            <section
                className="py-5 text-center text-white"
                style={{
                    background: "linear-gradient(135deg, #28a745, #218838)",
                    minHeight: "50vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop:"2.5rem"
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="p-4 p-md-5 rounded shadow-lg"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                >
                    <h1 className="display-4 fw-bold">About Us</h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="lead mt-3"
                        style={{ maxWidth: "700px", margin: "0 auto" }}
                    >
                        <strong>Smart AgriFit</strong>,is revolutionizing agriculture with data-driven insights.
                                We empower farmers to make informed decisions, improve crop yields, and
                                embrace modern farming technology.
                    </motion.p>
                    <Button
                        variant="light"
                        size="lg"
                        className="mt-4 fw-semibold"
                        href="#projects"
                    >
                        Explore Projects
                    </Button>
                </motion.div>
            </section>
            {/* Section separator */}
            {/* <div className="section-separator"></div> */}

            {/* Mission & Vision */}
            <Container className=" text-dark">
                <Row className="text-center mb-5">
                    <Col md={6} className="mb-3">
                        <Card className="h-100 shadow-sm border-0 p-3">
                            <Card.Body>
                                <Card.Title>Our Mission</Card.Title>
                                <Card.Text>
                                    To provide farmers with intelligent crop recommendations and
                                    agricultural insights using cutting-edge technology.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="h-100 shadow-sm border-0 p-3">
                            <Card.Body>
                                <Card.Title>Our Vision</Card.Title>
                                <Card.Text>
                                    To create a sustainable agricultural ecosystem where technology
                                    empowers farmers worldwide.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Projects Section */}
            <Container id="projects" className="mb-5 text-center">
                <h2>Other Projects I've Done</h2>
                <p>Some of the innovative solutions I’ve built as part of Smart AgriFit</p>
                <Row className="mt-4">
                    {projects.map((project, idx) => (
                        <Col md={4} className="mb-4" key={idx}>
                            <Card className="h-100 shadow-sm border-0 text-center project-card">
                                <Card.Img variant="top" src={teamImg} />
                                <Card.Body>
                                    <Card.Title>{project.title}</Card.Title>
                                    <Card.Text>{project.description}</Card.Text>
                                    <Button variant="success" href={project.link} target="_blank">View Project</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Developer Section */}
            <Container className="my-5">
                <div className="p-4 border rounded shadow text-center bg-light">
                    <h2 className="mb-3">About the Developer & Co-Founder</h2>
                    <img
                        src={developerImg}
                        alt="Mark Mwangi"
                        className="developer-img my-3 rounded-circle shadow"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                    <p className="lead">
                        Hi, I’m <strong>Mark Mwangi</strong>. Passionate about building intelligent
                        solutions in agriculture and technology.
                    </p>

                    {/* Social Media */}
                    <div className="social-icons my-3 d-flex justify-content-center gap-3">
                        <a href="https://www.linkedin.com/in/markmwangi" target="_blank" rel="noreferrer">
                            <FaLinkedin size={30} />
                        </a>
                        <a href="https://github.com/Mwangimark" target="_blank" rel="noreferrer">
                            <FaGithub size={30} />
                        </a>
                        <a href="https://twitter.com/mark" target="_blank" rel="noreferrer">
                            <FaTwitter size={30} />
                        </a>
                    </div>

                    {/* Portfolio Link */}
                    <div className="my-3">
                        <Button variant="outline-success" href="https://yourportfolio.com" target="_blank">
                            View My Portfolio
                        </Button>
                    </div>

                    {/* Contact Info */}
                    <div className="d-flex flex-column align-items-center my-3">
                        <p>
                            <FaEnvelope className="me-2 text-success" />
                            Email: <a href="mailto:markcosmars2000@gmail.com">markcosmars2000@gmail.com</a>
                        </p>
                        <p>
                            <FaPhone className="me-2 text-success" />
                            Contact: <a href="tel:+254740466295">+254 740 466 295</a>
                        </p>
                    </div>

                    <Button variant="success" size="lg">
                        Contact Me
                    </Button>
                </div>
            </Container>
            <Footer />
        </>
    );
};

export default AboutUs;

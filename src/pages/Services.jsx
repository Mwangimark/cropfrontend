import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import {
    FaSeedling,
    FaChartBar,
    FaRobot,
    FaLaptopCode,
    FaMobileAlt,
    FaSatellite,
} from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";
import cropImg from "../assets/cropImg.png";
import weatherImg from "../assets/weatherImg.png";
import soilImg from "../assets/soilImg.png";
import chatbotImg from "../assets/chatbotImg.png";
import dashboardImg from "../assets/dashboardImg.png";
import communityImg from "../assets/communityImg.png";

const services = [
    {
        img: cropImg,
        icon: <FaSeedling size={40} color="#28a745" />,
        title: "Smart Crop Recommendation",
        description:
            "ML-powered predictions to help you choose the best crops for your soil and climate.",
    },
    {
        img: weatherImg,
        icon: <FaChartBar size={40} color="#17a2b8" />,
        title: "Farm Data Analytics",
        description:
            "Turn soil, weather, and crop data into actionable insights for better decisions.",
    },
    {
        img: chatbotImg,
        icon: <FaRobot size={40} color="#ffc107" />,
        title: "AgriFit Chatbot",
        description: "24/7 intelligent support for farmers at your fingertips.",
    },
    {
        img: dashboardImg,
        icon: <FaLaptopCode size={40} color="#007bff" />,
        title: "Custom Web Solutions",
        description:
            "Web platforms tailored for agribusiness management and operations.",
    },
    {
        img: soilImg,
        icon: <FaMobileAlt size={40} color="#6610f2" />,
        title: "Mobile Integration",
        description:
            "USSD & mobile app support to make farming tech accessible anywhere.",
    },
    {
        img: communityImg,
        icon: <FaSatellite size={40} color="#e83e8c" />,
        title: "Future AI & IoT Expansion",
        description:
            "Drone monitoring, smart irrigation & more to shape the future of farming.",
    },
];

const ServicesPage = () => {
    return (
        <>
            <Header />
            <div className="bg-white text-dark"style={{marginTop:"2.5rem"}} >
                {/* 🔹 Hero Section */}
                <section
                    className="py-5 text-center text-white"
                    style={{
                        background: "linear-gradient(135deg, #28a745, #218838)",
                        minHeight: "50vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="p-4 p-md-5 rounded shadow-lg"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    >
                        <h1 className="display-4 fw-bold">Our Services</h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="lead mt-3"
                            style={{ maxWidth: "700px", margin: "0 auto" }}
                        >
                            At <strong>AgriFit</strong>, we blend technology with agriculture to provide smart solutions
                            that empower farmers, agribusinesses, and communities.
                        </motion.p>
                        <Button
                            variant="light"
                            size="lg"
                            className="mt-4 fw-semibold"
                            href="#services-grid"
                        >
                            Explore Services
                        </Button>
                    </motion.div>
                </section>


                {/* 🔹 Services Grid */}
                <Container className="py-5">
                    <Row className="g-5">
                        {services.map((service, index) => (
                            <Col key={index} md={6} lg={4}>
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                >
                                    <Card className="h-100 text-center shadow-lg border-0 rounded-4 overflow-hidden">
                                        {/* 🔹 Image on Top */}
                                        <Card.Img
                                            variant="top"
                                            src={service.img}
                                            alt={service.title}
                                            style={{
                                                height: "220px",
                                                objectFit: "cover",
                                            }}
                                        />
                                        <Card.Body>
                                            <div className="mb-3">{service.icon}</div>
                                            <Card.Title className="fw-bold">
                                                {service.title}
                                            </Card.Title>
                                            <Card.Text className="text-muted">
                                                {service.description}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </Container>

                {/* 🔹 Why Choose Us */}
                <section className="py-5 bg-light text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="fw-bold mb-4 text-success"
                    >
                        Why Choose Us?
                    </motion.h2>
                    <motion.ul
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="list-unstyled fs-5 mx-auto"
                        style={{ maxWidth: "600px" }}
                    >
                        <li>✔️ AI-driven accuracy for better farming outcomes</li>
                        <li>✔️ Easy-to-use tools accessible to all farmers</li>
                        <li>✔️ Local-first approach with regional insights</li>
                        <li>✔️ Scalable solutions built for the future</li>
                    </motion.ul>
                </section>

                {/* 🔹 CTA */}
                <section className="py-5 bg-success text-white text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="fw-bold mb-3"
                    >
                        Ready to transform your farming journey?
                    </motion.h2>
                    <Button variant="light" size="lg" className="fw-semibold">
                        Contact Me
                    </Button>
                </section>
            </div>
            <Footer />

        </>
    );
};

export default ServicesPage;

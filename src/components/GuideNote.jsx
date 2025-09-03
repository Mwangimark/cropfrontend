// src/components/GuideNote.jsx
import React from "react";
import { Card } from "react-bootstrap";
import { FaInfoCircle, FaBookOpen, FaFlask } from "react-icons/fa";

const GuideNote = () => {
  return (
    <Card className="shadow-sm border-0 guide-note">
      <Card.Body>
        <h5 className="d-flex align-items-center gap-2 text-success">
          <FaInfoCircle /> Soil Input Guide
        </h5>
        <p className="text-muted small">
          If you don’t know the exact soil values, here are some tips:
        </p>
        <ul className="small ps-3">
          <li>
            <FaFlask className="text-success me-2" />
            Collect a <strong>soil sample</strong> and take it to your nearest{" "}
            <em>agricultural office</em> or certified lab for analysis.
          </li>
          <li>
            <FaBookOpen className="text-success me-2" />
            Check the <strong><a href="/crops">Crops Identity</a> or <a href="/more_info">More Info</a></strong> section to learn
            about typical soil requirements for different crops.
          </li>
          <li>
            <FaInfoCircle className="text-success me-2" />
            If unsure, enter average values, but for accurate predictions, soil
            testing is recommended.
          </li>
        </ul>
        <p className="small text-muted mt-3">
          ⚠️ Always use realistic values (e.g., pH between 3–9, Nitrogen below
          140 kg/ha).
        </p>
      </Card.Body>
    </Card>
  );
};

export default GuideNote;

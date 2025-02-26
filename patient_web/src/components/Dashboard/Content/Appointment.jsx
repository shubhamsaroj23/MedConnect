import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Appointment = () => {
  const [slots, setSlots] = useState();

  useEffect(() => {
    const patient_token = localStorage.getItem("patient_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${patient_token}`,
      },
    };
    axios
      .get(
        `http://${process.env.REACT_APP_API_URL}:8000/api/consultation/slot_list/?status=True`,
        config
      )
      .then(function (response) {
        const data = response.data;
        setSlots(data[0]);
        console.log(data[0]);
      });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (consultation_id) => {
    console.log(consultation_id);
    navigate("/viewappointments", {
      state: {
        consultation_id: consultation_id,
      },
    });
  };

  return (
    <div>
      <Card>
        <Card.Body style={{ padding: "10px" }}>
          <p className="appoint-title">Appointments</p>
        </Card.Body>

        <Card
          className="appoint-card"
          style={{ margin: "5px", backgroundColor: "aliceblue" }}
        >
          <Card.Body>
            <Row>
              <Col>Patient Name</Col>
              <Col>Type</Col>
              <Col>Time</Col>
              <Col>View</Col>
            </Row>
          </Card.Body>
        </Card>

        {slots !== undefined &&
          slots.map((slot) => (
            <Card
              className="appoint-card"
              style={{ margin: "5px" }}
              key={slot.consultation_id}
            >
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Subtitle>{slot.patient_name}</Card.Subtitle>
                  </Col>
                  <Col>
                    <Card.Subtitle>{slot.start_time}</Card.Subtitle>
                  </Col>
                  <Col>
                    <Card.Subtitle>Need to Define</Card.Subtitle>
                  </Col>
                  <Col>
                    <Card.Subtitle>
                      <Button
                        onClick={() => handleSubmit(slot.consultation_id)}
                        className="view-butt"
                      >
                        view
                      </Button>
                    </Card.Subtitle>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
      </Card>
    </div>
  );
};

export default Appointment;

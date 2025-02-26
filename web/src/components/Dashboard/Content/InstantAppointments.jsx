import React, {useState,useEffect} from 'react'
import axios from 'axios';
import {Card, Table, Container, Row, Col } from "react-bootstrap"

const InstantAppointments = () => {
    const [appointments,setAppointments] = useState([])
    const temp_appointments = [
      {
        consultation_id: 1,
        start_time: "10:00:00",
        end_time: "10:30:00",
        date: "2023-04-25",
      },
      {
        consultation_id: 2,
        start_time: "12:00:00",
        end_time: "12:30:00",
        date: "2023-04-27",
      },
      {
        consultation_id: 3,
        start_time: "14:00:00",
        end_time: "14:30:00",
        date: "2023-04-29",
      },
    ];

    useEffect(() => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };
      axios
        .get(
          `http://${process.env.REACT_APP_API_URL}/api/doctors/received_payments/`,
          config
        )
        .then(function (response) {
          const data = response.data;
          setAppointments(data);
          console.log(data);
        });
    }, []);


    const renderTableRows = () => {
      return appointments.map((appointment) => {
        return (
          <tr key={appointment.consultation_id}>
            <td>{appointment.consultation_id}</td>
            <td>{appointment.start_time}</td>
            <td>{appointment.end_time}</td>
            <td>{appointment.date}</td>
            <td>View</td>
          </tr>
        );
      });
    };

  return (
    <>
      <Card>
        <Card.Title style={{ margin: "10px" }}>Upcoming Instant Consultations</Card.Title>
        <Table hover responsive>
          <thead>
            <tr style={{ color: "grey", fontWeight: 500 }}>
              <th>Consultation Id</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="ap-table">
            {appointments !== undefined ? <></> : <></>}
            {renderTableRows()}
          </tbody>
        </Table>
      </Card>
    </>
  );
}

export default InstantAppointments
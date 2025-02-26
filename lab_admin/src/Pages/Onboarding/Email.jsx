import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Email.css"


import axios from "axios";
import Header from "../../components/Header/header";

const Email = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const style = {
    height: "80%",
    width: "80%",
  };
  const handleChange = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      toast.warn("Please enter an Email Address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } else {
      const data = {
        email: email["email"],
      };
    }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };


      e.preventDefault();
      if (email.length === 0) {
          toast.warn("Please enter an Email Address", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
      } 
      else {
        const data = {
          email: email["email"],
        };

      // axios
      //   .post("http://127.0.0.1:8000/api/doctors/email/", data, config)
      //   .then((response) => {
      //     console.log(response.data);
      //     navigate("/otp", {
      //       state: {
      //         email: email["email"],
      //       },
      //     });
      //   })
      //   .catch((error) => console.log(error));

      fetch(`http://${process.env.REACT_APP_API_URL}/api/doctors/email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // add any additional headers here, such as authorization tokens
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          navigate("/otp", {
            state: {
              email: email["email"],
            },
          });
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  };
  return (
    <>
      <Header />
      {/* <center> */}
        <Container>
          
        <br/>
        <br/>
          <Row className=" d-flex align-items-center justify-content-center">
           
            <Col xs={12} lg={6} md={12} >
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <h2 style={{fontWeight:800}} >Get Start </h2>
                  <br/>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                   
                   style={{width:330}}
                    
                  />
                  {/* <TextField type="email" id="standard-basic" label="Enter your email id" variant="standard"  style={{width:330}}/> */}

                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Link
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={handleSubmit}
                to="/Formview"
              >
                {" "}
                <p className="main-btn-email">Submit</p>{" "}
              </Link>
            </Form>
          </Col>

          <Col xs={12} lg={5} md={12}>

          <p style={{fontSize:'40px',color:'black',fontWeight:'600'}}>Take Your Lab Online <br/> </p>
          <br/>
          <p style={{fontSize:'40px',color:'black',fontWeight:'600'}}>with  <span style={{color:'#fe7865'}}>MedConnect </span> </p>
            <br/>
            <img style={{height:'450px',width:'850px'}} src='https://img.freepik.com/free-vector/type-coronavirus-test_23-2148542394.jpg'></img>
           

          </Col>
        </Row>
      </Container>
      {/* </center> */}
      <ToastContainer />
    </>
  );
};

export default Email;

import React, { useState } from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:8081/tickets/deleteTicket";

function Refunding() {
  const [data, setData] = useState({ ticketnum: ""});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  //handle cancel button
  const handleCancel = async => {
    navigate("/ticketViewingPage");
  }

  //handle submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(url, data);
      const {accessToken} = res
      //get accesstoken stored on device
      localStorage.getItem("accessToken", accessToken)
      navigate("/ticketViewingPage");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  //Show Refund Form
  return (
    <Form>
    <h1>Welcome to MBTA Refunding Page</h1>
        <Form.Group className="mb-3" controlId="Username" >
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="username" 
            name="username" 
            placeholder="Please Enter Your Username" /> 
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Please Enter Your Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ConfirmationNum">
          <Form.Label>Confirmation Number</Form.Label>
          <Form.Control 
            type="ticketnum"  
            name="ticketnum"  
            onChange={handleChange}
            placeholder="Please Enter Your Ticket Confirmation Number"/>
        </Form.Group>

        

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check 
            type="checkbox" 
            label="I am sure I want to cancel my ticket" />
        </Form.Group>
        
        {error && (
          <div className="pt-3">
            {error}
          </div>
        )}
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          className="mt-2"
        >
          Confirm
        </Button>
        <Button 
          variant="primary" 
          type="cancel" 
          onClick={handleCancel}
          className="mt-2">
          Cancel
        </Button>
      </Form>
    );
  }
export default Refunding;
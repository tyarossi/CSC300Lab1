import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";

// const ticketsInfo =[{'username':'Chia', 'confirmNum': '123456','departureStation': ' Salem','arrivalStation': 'North Station', 'trainDepartureTime':'17:20 pm ','date':'2023.04.01'},
// {'username':'Su', 'confirmNum': '1235754','departureStation': ' Peabody','arrivalStation': 'South Station', 'trainDepartureTime':'19:40 pm ','date':'2023.05.01'}];
function View() {
  const [ticketsInfo, setTicketsInfo] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'http://localhost:8081/tickets/getAllTickets',
      );
      setTicketsInfo(result.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setUser(getUserInfo())
  }, []);

  const handlePurchase = (async) => {
    navigate("/buyTicket");
  };

  const handleRefund = (async) => {
    navigate("/ticketRefundingPage");
  };

  if (!user) return (<div><h4>Log in to view this page.</h4></div>)
  return (
    <div>
      <div class="col-md-12 text-center">
          <>
            <Button className="me-2" onClick={handlePurchase}>
              Purchase Ticket
            </Button>

            <Button className="me-2" onClick={handleRefund}>
              Refund Ticket
            </Button>
          </>
        </div>
      {ticketsInfo.map(tickets => (
        <Card
        body
        outline
        color="success"
        className="mx-1 my-2"
        style={{ width: "50rem", color:'purple', fontWeight:'bold',te:'center', fontSize:'60'}}
      >
        <Card.Body>
          <Card.Title>Your MBTA Ticket Information</Card.Title>
          <Card.Text style={{color:'black'}}>Username : {tickets.username}</Card.Text>
          <Card.Text style={{color:'black'}}>Date : {tickets.date}</Card.Text>
          <Card.Text style={{color:'black'}}>Train Departure Station : {tickets.stationA}</Card.Text>
          <Card.Text style={{color:'black'}}>Train Arrival Station : {tickets.stationB}</Card.Text>
          <Card.Text style={{color:'black'}}>Departure Time : {tickets.departuretime}</Card.Text>
          <Card.Text style={{color:'black'}}>Confirmation Number : {tickets.ticketnum} </Card.Text>        
        </Card.Body>
      </Card>
      ))}
    </div>
  );
}
export default View;

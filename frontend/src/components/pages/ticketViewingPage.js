import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";

function View() {
  const [ticketsInfo, setTicketsInfo] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!user || !user.username) {
        return;
      }
      const username = user.username;
      console.log('fetching tickets for user:', username);
      const result = await axios.get(
        `http://localhost:8081/tickets/getTicketsbyUser?username=${username}`
        );
      if(result.data != null){
        setTicketsInfo([result.data]);
      }
    };
    fetchData();
    console.log('ticketinfo:', ticketsInfo);
  }, [user?.username]); // Update the useEffect dependency to user.username

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const handlePurchase = () => {
    navigate("/buyTicket");
  };

  const handleRefund = () => {
    navigate("/ticketRefundingPage");
  };
  if (!user) return (<div><h4>Log in to view this page.</h4></div>)
  return (
    <div>
      <div class="col-md-12 text-center">
        <h4>Hello {user.username}!</h4>
          <>
            <Button className="me-2" onClick={handlePurchase}>
              Purchase Ticket
            </Button>

            <Button className="me-2" onClick={handleRefund}>
              Refund Ticket
            </Button>
          </>
        </div>
        {ticketsInfo.length > 0 ?(
        ticketsInfo.map(ticket => (
        <Card
        body
        outline
        color="success"
        className="mx-1 my-2"
        style={{ width: "50rem", color:'purple', fontWeight:'bold',te:'center', fontSize:'60'}}
      >
        <Card.Body>
          <Card.Title>Your MBTA Ticket Information</Card.Title>
          <Card.Text style={{color:'black'}}>Username : {ticket.username}</Card.Text>
          <Card.Text style={{color:'black'}}>Date : {ticket.date}</Card.Text>
          <Card.Text style={{color:'black'}}>Train Departure Station : {ticket.stationA}</Card.Text>
          <Card.Text style={{color:'black'}}>Train Arrival Station : {ticket.stationB}</Card.Text>
          <Card.Text style={{color:'black'}}>Departure Time : {ticket.departuretime}</Card.Text>
          <Card.Text style={{color:'black'}}>Confirmation Number : {ticket.ticketnum} </Card.Text>        
        </Card.Body>
      </Card>
      ))
      ) : (
        <div class="col-md-12 text-center">
          <h4>You do not currently have a Ticket.</h4>
        </div>
      )}
    </div>
  );
}
export default View;

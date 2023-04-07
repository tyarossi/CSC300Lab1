import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const url = "http://localhost:8081/tickets/getAllTickets";

// const ticketsInfo =[{'username':'Chia', 'confirmNum': '123456','departureStation': ' Salem','arrivalStation': 'North Station', 'trainDepartureTime':'17:20 pm ','date':'2023.04.01'},
// {'username':'Su', 'confirmNum': '1235754','departureStation': ' Peabody','arrivalStation': 'South Station', 'trainDepartureTime':'19:40 pm ','date':'2023.05.01'}];
function View() {
  const [ticketsInfo, setTicketsInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'http://localhost:8081/tickets/getAllTickets',
      );
      setTicketsInfo(result.data);
    }
    fetchData();
  }, []);

return (
    <div>
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

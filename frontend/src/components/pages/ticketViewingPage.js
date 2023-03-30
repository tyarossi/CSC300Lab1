import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const TicketViewingPage= () =>{
const ticketInfo = [{'username':'Username: Chia', 'confirmNum': 'Confirmation Number :123456','Departure Station': 'Salem','Arrival station': 'North Station', 'trainDepartureTime':'The Train Departure Time : 17:20 pm ','date':'Date : 2023.04.01'}];


return (
    <div>
      {ticketInfo.map(ticket => (
        <Card
        body
        outline
        color="success"
        className="mx-1 my-2"
        style={{ width: "50rem", color:'purple', fontWeight:'bold',content:'center' }}
      >
        <Card.Body>
        <Card.Title>Your MBTA Ticket Information</Card.Title>
        <Card.Text>{ticket.username}</Card.Text>
        <Card.Text>{ticket.date}</Card.Text>
        <Card.Text>{ticket.trainDepartureTime}</Card.Text>
        <Card.Text>{ticket.departureStation}</Card.Text>
        <Card.Text>{ticket.arrivalStation}</Card.Text>
        <Card.Text>{ticket.confirmNum}</Card.Text>
        
        </Card.Body>
      </Card>
      ))}


        <h1>Your Ticket Information</h1>
      {ticketInfo.map(ticket => (
        <div key={ticket.username}>
          <h3>{ticket.username}</h3>
          <h4>{ticket.date}</h4>
          <h5>{ticket.trainDepartureTime}</h5>
          <h6>{ticket.departureStation}</h6>
          <h7>{ticket.arrivalStation}</h7>
          <h8>{ticket.confirmNum}</h8>
        </div>
      ))}
    </div>
  );

}
export default TicketViewingPage;

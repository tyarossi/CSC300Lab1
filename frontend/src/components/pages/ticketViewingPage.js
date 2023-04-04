import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';


//[{'username':'Username: Chia', 'confirmNum': 'Confirmation Number :123456','departureStation': 'Departure Station: Salem','arrivalStation': 'Arrival station : North Station', 'trainDepartureTime':'The Train Departure Time : 17:20 pm ','date':'Date : 2023.04.01'}];
function View() {
  const [ticketInfo, tickets] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/alerts?sort=banner&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE',
      );
      tickets(result.data.data);
    }
    fetchData();
  }, []);



return (
    <div>
      {ticketInfo.map(tickets => (
        <Card
        body
        outline
        color="success"
        className="mx-1 my-2"
        style={{ width: "50rem", color:'purple', fontWeight:'bold',content:'center' }}
      >
        <Card.Body>
        <Card.Title>Your MBTA Ticket Information</Card.Title>
        <Card.Text>{tickets.username}</Card.Text>
        <Card.Text>{tickets.date}</Card.Text>
        <Card.Text>{tickets.trainDepartureTime}</Card.Text>
        <Card.Text>{tickets.departureStation}</Card.Text>
        <Card.Text>{tickets.arrivalStation}</Card.Text>
        <Card.Text>{tickets.confirmNum}</Card.Text>
        
        </Card.Body>
      </Card>
      ))}


        <h1>Your Ticket Information</h1>
      {ticketInfo.map(tickets => (
        <div key={tickets.username}>
          <h3>{tickets.username}</h3>
          <h4>{tickets.date}</h4>
          <h5>{tickets.trainDepartureTime}</h5>
          <h6>{tickets.departureStation}</h6>
          <h7>{tickets.arrivalStation}</h7>
          <h8>{tickets.confirmNum}</h8>
        </div>
      ))}
    </div>
  );

}
export default View;

import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

//set variable that changes the color of the cards depending on background color
const storedColor = localStorage.getItem("bgColor")
let myColor = 'bg-light';
if(storedColor === 'Black'){
  myColor = 'bg-secondary';
}


function Alerts() {
  const [alerts, setAlerts] = useState([]);


  useEffect(() => {
    
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/alerts?sort=banner&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE',
      );
      setAlerts(result.data.data);
    }
    fetchData();
  }, []);


  return (
    <div>
      {alerts.map(alert => (
        <Card
        body
        outline
        className={myColor}
        style={{ width: "30rem"}}
      >
        <Card.Body>
        <Card.Title>Alert</Card.Title>
        <Card.Text>{alert.attributes.header}{alert.attributes.description}</Card.Text>
        </Card.Body>
      </Card>
      ))}


        <h1>Alerts!</h1>
      {alerts.map(alert => (
        <div key={alert.id}>
          <h3>{alert.attributes.header}</h3>
          <p>{alert.attributes.description}</p>
        </div>
      ))}
    </div>
  );
}


export default Alerts;
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';


function Trip() {
  const [trips, setTrips] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/trips?filter%5Broute%5D=Red',
      );
      setTrips(result.data.data);
    }
    fetchData();
  }, []);


  return (
    <div>
      {trips.map(trip => (
        <Card
        body
        outline
        color="success"
        className="mx-1 my-2"
        style={{ width: "30rem" }}
      >
        <Card.Body>
        <Card.Title>{trip.attributes.headsign}</Card.Title>
        <Card.Text>{trip.attributes.block_id} || Line: {trip.relationships.route.data.id}</Card.Text>
        <p>Wheelchair accessible: {trip.attributes.wheelchair_accessible} || Bikes Allowed: {trip.attributes.bikes_allowed}</p>
        </Card.Body>
      </Card>
      ))}


        <h1>Trips!</h1>
      {trips.map(trip => (
        <div key={trip.id}>
          <h3>{trip.attributes.header}</h3>
          <p>{trip.attributes.description}</p>
        </div>
      ))}
    </div>
  );
}


export default Trip;
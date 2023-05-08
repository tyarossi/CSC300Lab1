import React, {} from 'react'
import Card from 'react-bootstrap/Card';

const Landingpage = () => {
    
    return (
    <div
      className="row d-flex justify-content-center align-items-center h-100 "
    >
        <Card style={{ width: '30rem' }} className="mx-2 my-2">
        <Card.Body>
          <Card.Title>Hello and Welcome to Choozgo!</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Please Sign in to View your Personal Information.</Card.Subtitle>
          <Card.Text>
          </Card.Text>
          <Card.Link href="/signup">Sign Up</Card.Link>
          <Card.Link href="/login">Login</Card.Link>
        </Card.Body>
      </Card>
    </div>
    )
}

export default Landingpage
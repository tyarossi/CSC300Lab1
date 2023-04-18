import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormText from 'react-bootstrap/esm/FormText';


// const PRIMARY_COLOR = "#cc5c99";
// const SECONDARY_COLOR = "#0c0c1f";

// const CreateTicket = () => {
//   const [light, setLight] = useState(false);
//   const [bgColor, setBgColor] = useState(SECONDARY_COLOR);
//   const [bgText, setBgText] = useState("Light Mode");
// }

// useEffect(() => {
//   if (light) {
//     setBgColor("white");
//     setBgText("Dark mode");
//   } else {
//     setBgColor(SECONDARY_COLOR);
//     setBgText("Light mode");
//   }
// }, [light]);



function Refunding() {
  

    return (
      
  
    <Form>
    
    <h1> 
        Welcome to MBTA Refunding Page
      </h1>
        

        
        
        <Form.Group className="mb-3" controlId="Username" >
          <Form.Label>Username</Form.Label>
         
          <Form.Control type="username" placeholder="Please Enter Your Username" />
          
          
         </Form.Group>
  
        <Form.Group className="mb-3" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Please Enter Your Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ConfirmationNum">
          <Form.Label>Confirmation Number</Form.Label>
          <Form.Control type="confirmNum" placeholder="PLease Enter Your Ticket Confirmation Number" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="PaymentInfo">
          <Form.Label>Payment Information</Form.Label>
          <Form.Control type="paymentInfo" placeholder="Please Enter Your Payment Information" />
          <Form.Text className="text-muted">
            We'll never share your payment information with anyone else.
          </Form.Text>
          </Form.Group>



        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="I am sure I want to cancel my ticket" />
        
        </Form.Group>
        <Button variant="primary" type="Submit">
          Submit
        </Button>
      </Form>
    );
  }

  
  
  export default Refunding;

    
    


//   function Refunding() {
  
//     return (
//         <button>
//             Cancel
//         </button>   
//     );
// }
    
//         <div>
//         <h1>
//         style={{color:'white', fontSize:'150', fontWeight:'bold',flex:1,justifyContent: 'right', alignItems: 'right',  textAlign: 'center',fontWeight:'bold' }}
//         Welcome to MBTA Ticket Refunding Page </h1>
//         <h2>style={{color:'#b342f5', fontSize:'50', fontWeight:'bold',content:'center',textAlign: 'center' }} 
//         Please Enter Your Username, Password and Ticket Confirmation Number</h2>
        
       
//         </div>
    





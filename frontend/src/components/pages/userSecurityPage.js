import React, { useState } from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const url = "http://localhost:8081/userquestions/userInfoSecurity";


function Security(){
    //const [userInfoSecurity, setInfoSecurity] = useState([]);
    const [data, setData] = useState({ username: "", color: "", animal: "", country: ""});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleClickeditUser =(c) => {

    c.preventDefault();
    navigate('/editUserProfile');
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(url, data);
      const {accessToken} = res
      console.log("success");
      localStorage.getItem("accessToken", accessToken)
      navigate("/userSecuritypage");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log("error");
        setError(error.response.data.message);
      }
    }
  };
  
  return(
    <Form>
    <h1>Welcome to MBTA Security Question Page
      </h1>
      
      {/* <h4 className="security-message">
You will need to answer three security questions to change your personal information
</h4>  */}


        <Form.Group className="mb-3" controlId="Username" >
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="username" 
            name="username" 
            onChange={handleChange}
            placeholder="Please Enter Your Username" /> 
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="Question 1 ">
          <Form.Label>What is your favorite color ?</Form.Label>
          <Form.Control 
            type="What is your favorite color ?" 
            name="color" 
            onChange={handleChange}
            placeholder="Please Enter Your Question 1 Answer Here" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Question 2">
          <Form.Label>What is your favorite animal ?</Form.Label>
          <Form.Control 
            type="What is your favorite animal ?"  
            name="animal" 
            onChange={handleChange} 
            placeholder="Please Enter Your Question 2 Answer Here"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Question 3 ">
          <Form.Label>What is your favorite country ?</Form.Label>
          <Form.Control 
            type="What is your favorite country ?" 
            name="country" 
            onChange={handleChange}
            placeholder="Please Enter Your Question 3 Answer Here" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check 
            type="checkbox" 
            label=" I will need to answer my three security questions correctly to change your personal information" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check 
            type="checkbox" 
            label="I am sure I want to submit it " />
        </Form.Group>
        
        {error && (
          <div className="pt-3">
            {error}
          </div>
        )}
        
        <Link to ="/editUserProfile">
        <button onClick={(e) => handleClickeditUser(e)}>
        Confirm 
            </button>
        
        
        </Link>
      </Form>
      
      
    );
    }
export default Security;


    
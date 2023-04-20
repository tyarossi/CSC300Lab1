import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt';

const EditUserPage = () =>{

  const url = "http://localhost:8081/user/editUser";
  const navigate = useNavigate();

  // initialize form values and get userId, username, email & password on render
  const [form, setValues] = useState({userId : "", favline: "", favroute: "" })
  const [user, setUser] = useState({})
  useEffect(() => {
    setValues({userId : getUserInfo().id})
  }, [])

  // handle form field changes
  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...form, [input.id]: input.value });
  };

  // handle form submission with submit button
  const handleSubmit = async (event) => {
    event.preventDefault();
      try {
        const { data: res } = await axios.post(url, form);
        const { accessToken } = res;
        //get token in localStorage
        localStorage.getItem("accessToken", accessToken);
        localStorage.clear();
        setUser(getUserInfo())
        navigate("/privateuserprofile");
      } catch (error) {
      if (
        error.response &&
        error.response.status != 409 &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        window.alert(error.response.data.message);
      }
    }
  }

  // handle cancel button
  const handleCancel = async => {
    navigate("/privateuserprofile");
  }

  return(
    <div>
      <Card body outline color="success" className="mx-1 my-2" style={{ width: '30rem' }}>
        <Card.Title>Edit User Information</Card.Title>
        <Card.Body> 
        <Form>

          <Form.Group className="mb-3" controlId="formLine">
            <Form.Label>Your Favorite Line to Travel</Form.Label>
            <Form.Control type="text" placeholder="Enter new Line" 
                        id="favline"
                        value={form.favline}
                        onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRoute">
            <Form.Label>Your Favorite Route to Travel</Form.Label>
            <Form.Control type="text" placeholder="Enter new Route" 
                        id="favroute"
                        value={form.favroute}
                        onChange={handleChange}
            />
          </Form.Group>

        <h7>You Will be Required to Login After Submitting Changes.</h7>
        
        <Row>
          <Col>
          <Button 
            variant="primary" 
            type="submit" 
            onClick={handleSubmit}>
            Submit
          </Button>
          </Col>

          <Col>
          <Button 
            variant="primary" 
            type="cancel" 
            onClick={handleCancel}>
            Cancel
          </Button>
          </Col>
        </Row>

        </Form>
        </Card.Body>
      </Card>
      </div>
  )
}

export default EditUserPage;
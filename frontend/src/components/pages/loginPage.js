import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import getUserInfo from "../../utilities/decodeJwt";
import MBTA from "../images/MBTA.jpg";

const PRIMARY_COLOR = "#9a7bb5";
const SECONDARY_COLOR = '#b57bac'
const url = "http://localhost:8081/user/login";


const Login = () => {
  const [user, setUser] = useState(null)
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [light, setLight] = useState(false);
  const [bgColor, setBgColor] = useState(SECONDARY_COLOR);
  const [bgText, setBgText] = useState('Light Mode')
  const navigate = useNavigate();

  let labelStyling = {
    color:SECONDARY_COLOR ,
    fontWeight: "bold",
    //change text color
    textDecoration: localStorage.getItem("textColor"),
  };
  //change background color
  let backgroundStyling = { background: bgColor };
  let buttonStyling = {
    background: PRIMARY_COLOR,
    borderStyle: "none",
    color: bgColor,
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {

    const obj = getUserInfo(user)
    setUser(obj)

    if (light) {
      setBgColor("Pink");
      setBgText('Light mode')
    } else {
      setBgColor("Black");
      setBgText('Dark mode')
    }
  }, [light]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(url, data);
      const { accessToken } = res;
      //store token in localStorage
      localStorage.setItem("accessToken", accessToken);
      navigate("/home");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  if(user) {
    navigate('/home')
    return
  }

  return (
    <>
      <section className="vh-100">
        <div  className="container-fluid h-custom vh-100">
          <div id = "myDiv"
            className="row d-flex justify-content-center align-items-center h-100 "
            style={backgroundStyling}>
              
              <div style={{color:'white', fontSize:'150', fontWeight:'bold',flex:1,justifyContent: 'center', alignItems: 'center' }}>Welcome to MBTA </div>
              <img src={MBTA} style={{width:'50%', height: '50%'}}/>
              {/* <img src="MBTA.jpg" style="width:50% Height: 50%"/> */}
              <div style={{color:'#b342f5', fontSize:'50', fontWeight:'bold',content:'center' }}>Please enter your username and password </div>
            
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={labelStyling}>Username</Form.Label>
                  <Form.Control
                    type="username"
                    name="username"
                    onChange={handleChange}
                    placeholder="Enter username"
                  />
                  
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={labelStyling}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
            
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Text className="text-muted pt-1">
                    Don't have an account?
                    <span>
                      <Link to="/signup" style={labelStyling}> Sign up
                      </Link>
                    </span>
                  </Form.Text>
                </Form.Group>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    onChange={() => { setLight(!light) }}
                  />
                  <label class="form-check-label" for="flexSwitchCheckDefault" className='text-muted'>
                    {bgText}
                  </label>
                </div>
                {error && <div style={labelStyling} className='pt-3'>{error}</div>}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                  style={buttonStyling}
                  className='mt-2'
                >
                  Log In
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  ); 
};

export default Login;

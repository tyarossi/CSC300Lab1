import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const PRIMARY_COLOR = "#cc5c99";
const SECONDARY_COLOR = "#0c0c1f";
const url = "http://localhost:8081/tickets/createTickets";

const CreateTicket = () => {
  const [data, setData] = useState({ username: "", depaturetime: "", stationA: "", stationB: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [light, setLight] = useState(false);
  const [bgColor, setBgColor] = useState(SECONDARY_COLOR);
  const [bgText, setBgText] = useState("Light Mode");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {
    if (light) {
      setBgColor("white");
      setBgText("Dark mode");
    } else {
      setBgColor(SECONDARY_COLOR);
      setBgText("Light mode");
    }
  }, [light]);

  let labelStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "x-large",
  };
  let backgroundStyling = { background: bgColor };
  let buttonStyling = {
    background: PRIMARY_COLOR,
    borderStyle: "none",
    color: bgColor,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(url, data);
      const {accessToken} = res
      //get accesstoken stored on device
      localStorage.getItem("accessToken", accessToken)
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

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom vh-100">
          <div
            className="row d-flex justify-content-center align-items-center h-100 "
            style={backgroundStyling}
          >
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
                <Form.Group className="mb-3" controlId="formBasicTime">
                  <Form.Label style={labelStyling}>Departure Time</Form.Label>
                  <Form.Control
                    type="departuretime"
                    name="departuretime"
                    onChange={handleChange}
                    placeholder="Please Enter a Departure Time"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDS">
                  <Form.Label style={labelStyling}>Departure Station</Form.Label>
                  <Form.Control
                    type="stationA"
                    name="stationA"
                    placeholder="Station A"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAS">
                  <Form.Label style={labelStyling}>Arrival Station</Form.Label>
                  <Form.Control
                    type="stationB"
                    name="stationB"
                    placeholder="Station B"
                    onChange={handleChange}
                  />
                </Form.Group>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    onChange={() => {
                      setLight(!light);
                    }}
                  />
                  <label
                    class="form-check-label"
                    for="flexSwitchCheckDefault"
                    className="text-muted"
                  >
                    {bgText}
                  </label>
                </div>
                {error && (
                  <div style={labelStyling} className="pt-3">
                    {error}
                  </div>
                )}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                  style={buttonStyling}
                  className="mt-2"
                >
                  Buy Ticket
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateTicket;

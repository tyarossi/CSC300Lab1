import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const url = "http://localhost:8080/userInfoSecurity";

function Security(){
    const [ticketsInfo, setInfoSecurity] = useState([]);
}
const express = require("express");
const router = express.Router();
const z = require('zod')
const bcrypt = require("bcrypt");
const { newTicketValidation } = require('../models/ticketValidator')
const newTicketModel = require('../models/ticketModel')

router.post('/createTickets', async (req, res) => {
    const { error } = newTicketValidation(req.body);
    console.log(error)
    if (error) return res.status(400).send({ message: error.errors[0].message });

    const { username, departuretime, stationA, stationB } = req.body

    //check if user already has a ticket
    const ticket = await newTicketModel.findOne({ username: username })
    if (ticket)
        return res.status(409).send({ message: "You Already Have a Ticket" })
    
    //create a random 5 digit number for ticketnum
    var min = 10000;
    var max = 99999;
    var x = Math.floor(Math.random() * (max - min + 1)) + min;

    //creates a new ticket
    const createTicket = new newTicketModel({
        username: username,
        departuretime: departuretime,
        stationA: stationA,
        stationB: stationB,
        ticketnum: x,
    });

   
    try {
        const saveNewTicket = await createTicket.save();
        res.send(saveNewTicket);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new ticket" });
    }

})

module.exports = router;
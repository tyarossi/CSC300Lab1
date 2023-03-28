const express = require("express");
const router = express.Router();
const newTicketModel = require('../models/ticketModel')

router.get('/getAllTickets', async (req, res) => {
    const tickets = await newTicketModel.find();
    return res.json(tickets)
  })

  module.exports = router;
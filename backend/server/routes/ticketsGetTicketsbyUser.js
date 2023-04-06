const express = require("express");
const router = express.Router();
const newTicketModel = require('../models/ticketModel')

router.get('/getTicketsbyUser', async (req, res) => {
  const { username } = req.body
    const ticket = await newTicketModel.findOne({username: username});
    if (ticket)
      return res.json(ticket)

    const findTicket = new newTicketModel({
      username: username,
  });

  return res.json(ticket)
  });

  module.exports = router;
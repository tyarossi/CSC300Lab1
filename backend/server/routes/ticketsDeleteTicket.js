const express = require("express");
const router = express.Router();
const newTicketModel = require('../models/ticketModel')

router.post('/deleteTicket', async (req, res) => {
    const { ticketnum } = req.body
    const ticket = await newTicketModel.deleteOne({ticketnum: ticketnum});
    if (ticket)
      return res.send({ message: "Ticket Deleted" })

    const findTicket = new newTicketModel({
      ticketnum: ticketnum,
  });

  return res.json(ticket)
  });

  module.exports = router;
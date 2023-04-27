const express = require("express");
const router = express.Router();
const newTicketModel = require('../models/ticketModel')

router.get('/getTicketsbyUser', async (req, res) => {
  try {
    const username = req.query.username;
    const ticket = await newTicketModel.findOne({ username: username });
    if(ticket != null){
      return res.json(ticket);
    }
    if(ticket === null){
      return res.status(404).send('No Ticket Found');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
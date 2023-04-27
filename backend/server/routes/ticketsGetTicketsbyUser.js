const express = require("express");
const router = express.Router();
const newTicketModel = require('../models/ticketModel')

router.get('/getTicketsbyUser', async (req, res) => {
  const username = req.body.username;
  newTicketModel.findOne({username : username },(err, ticket) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error.");
    }
    else if (!ticket) {
      return res.status(404).send("Ticket does not exist.");
    } 
    else {
      return res.json(ticket);
    }
  });
});

 module.exports = router;
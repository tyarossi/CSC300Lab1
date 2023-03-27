const mongoose = require("mongoose");

//ticket schema/model
const newTicketSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    departuretime:{
      type:String,
      label: "departuretime",
    },
    arrivaltime:{
      type:String,
      label: "arrivaltime",
    },
    ticketnum:{
      type:String,
      label: "ticketnum",
    },
    stationA:{
      type:String,
      label: "stationA",
    },
    stationB:{
      type:String,
      label: "stationB",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "tickets" }
);

module.exports = mongoose.model('tickets', newTicketSchema)
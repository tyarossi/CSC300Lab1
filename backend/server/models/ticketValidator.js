const z = require('zod')

//validates when new tickets are created
const newTicketValidation = data => { 
  const ticketValidationSchema = z.object({
    username : z.string().min(6, 'Username must be 6 characters or more'),
    departuretime : z.string().min(4, 'Enter Departure Time'),
    stationA: z.string().min(8, 'Enter Your Station').trim(),
    stationB: z.string().min(8, 'Enter Where You Want To Go').trim(),
  });
  
  return ticketValidationSchema.safeParse(data)
};

module.exports.newTicketValidation = newTicketValidation;
const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')
const getAllTicketsRoute = require('./routes/ticketsGetAllTickets')
const createTicketsRoute = require('./routes/ticketsCreateTickets')
const deleteTicketRoute = require('./routes/ticketsDeleteTicket')
const getTicketsbyUserRoute = require('./routes/ticketsGetTicketsbyUser')
const userInfoSecurityRoute = require('./routes/userInfoSecurity')

require('dotenv').config();
const SERVER_PORT = 8081

dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)
app.use('/tickets', getAllTicketsRoute)
app.use('/tickets', createTicketsRoute)
app.use('/tickets', deleteTicketRoute)
app.use('/tickets', getTicketsbyUserRoute)
app.use('/userquestions', userInfoSecurityRoute)

app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})

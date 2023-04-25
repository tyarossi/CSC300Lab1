const express = require("express");
const router = express.Router();
const z = require('zod')
const bcrypt = require("bcrypt");
const newUserModel = require('../models/userModel');

router.post('/editUser', async (req, res) =>
{
    // store new user information
    const {userId, favline, favroute} = req.body

    // find and update user using stored information
    newUserModel.findByIdAndUpdate(userId, {
        favline: favline,
        favroute: favroute
    } ,function (err, user) {
    if (err){
        console.log(err);
    }
    if (user){
        return res.json(user)
    }
    });

})

module.exports = router;
const e = require("express");
const express = require("express");
const router = express.Router();
const SecurityQuestion = require('../models/questionModel');
const newUserModel = require("../models/userModel");


router.post('/userInfoSecurity', async (req, res) => {
  const { user, questions } = req.body;
  console.log("the requested user is " + user);
  console.log("The questions is "+ questions);

  try {

    const securityQuestion = await SecurityQuestion.findOne({ user : user });
    
    console.log("The security question is "+ securityQuestion);
    if (!securityQuestion) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    questions.forEach(function(element){
      console.log(element);
      const question = securityQuestion.questions.find((e)=>e.question===element.question);
      console.log(question);
      
      if(question === undefined || question.answer !== element.answer){
        console.log(question.answer);
        return res.status(401).json({ error: 'Answer is incorrect' });
      }
    });
    return res.status(200).json({ message: 'Answer is correct' });
  } catch (err) {
    console.error(err);

  }
});

module.exports = router;




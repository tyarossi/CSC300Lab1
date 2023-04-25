const e = require("express");
const express = require("express");
const router = express.Router();
const SecurityQuestion = require('../models/questionModel');
const newUserModel = require("../models/userModel");


router.post('/userInfoSecurity', async (req, res) => {
//  const { user, questions } = req.body;
  const { username, color, animal, country } = req.body;
  console.log("the requested user is " + username);
  console.log("The answer is "+ color + animal + country);

  try {
    const securityAns = await SecurityQuestion.findOne({ username : username });
    
    console.log("The security answer for " + username + " is " + securityAns);
    if (!securityAns) {
      return res.status(404).json({ error: 'User not found' });
    }
   
    if(color!==securityAns.color || animal!==securityAns.animal || country!==securityAns.country){
      return res.status(401).json({ error: 'Answer is incorrect' });
    }
    
    // questions.forEach(function(element){
    //   console.log(element);
    //   const question = securityQuestion.questions.find((e)=>e.question===element.question);
    //   console.log(question);
      
    //   if(question === undefined || question.answer !== element.answer){
    //     console.log(question.answer);
    //     return res.status(401).json({ error: 'Answer is incorrect' });
    //   }
    // });
    return res.status(200).json({ message: 'Answer is correct' });
  } catch (err) {
    console.error(err);

  }
});

module.exports = router;




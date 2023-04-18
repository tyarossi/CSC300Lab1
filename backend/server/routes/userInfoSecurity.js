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
    //const newUser = await newUserModel.findById(user);
    //console.log(newUser);
    const securityQuestion = await SecurityQuestion.findOne({ user : user });
    //const securityQuestion = await SecurityQuestion.findById('6438111ed35ac6a1d877843f');
    console.log("The security question is "+ securityQuestion);
    if (!securityQuestion) {
      return res.status(404).json({ error: 'User not found' });
    }

    // const matchedQuestion = securityQuestion.questions.find(
    //   (q) => q.question === question
    // );
    // console.log(matchedQuestion);
    // if (!matchedQuestion) {
    //   return res.status(404).json({ error: 'Question not found' });
    // }

    // if (matchedQuestion.answer === answer) {
    //   return res.status(200).json({ message: 'Answer is correct' });
    // } else {
    //   return res.status(401).json({ error: 'Answer is incorrect' });
    // }
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
//    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
// router.post('/userInfoSecurity', async (req, res) => {
//     const { questionId, answer } = req.body;
//     console.log('aaaa');
//     try {
//         const securityQuestion = await SecurityQuestion.findById(questionId);
    
//         if (!securityQuestion) {
//           return res.status(404).json({ error: 'Security question not found' });
//         }
//         if (securityQuestion.answer.toLowerCase() === answer.toLowerCase()) {
            
//             return res.json({ success: true });
//           } else {
            
//             return res.status(401).json({ error: 'Incorrect answer' });
//           }
//         } catch (err) {
          
//           return res.status(500).json({ error: 'Internal server error' });
//         }
//       });
      
//       module.exports = router;



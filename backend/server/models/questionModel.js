const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({ question: { type: String, required: true },
  answer: { type: String, required: true }});

const securityQuestionSchema = new Schema({
  questions: [questionSchema],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const SecurityQuestion = mongoose.model('userquestions', securityQuestionSchema);

module.exports = SecurityQuestion;

// const newQuestionSchema = new mongoose.Schema(
//     {
//         username: {
//             type: String,
//             required: true,
//             label: "username",
//           },
//         securityquestion1:{
//             type:String,
//             label: "Question1 ",
//           },
//           securityquestion2:{
//             type:String,
//             label: "Question2 ",
//           },
//           securityquestion3:{
//             type:String,
//             label: "Question3 ",
//           },
//           securityanswer1:{
//             type:String,
//             label: "answer1 ",
//           },
//           securityanswer2:{
//             type:String,
//             label: "answer2 ",
//           },
//           securityanswer3:{
//             type:String,
//             label: "answer3 ",
//           },

//         },
//           { collection: "userquestions" }

//     );
//     module.exports = mongoose.model('userquestions', newQuestionSchema)
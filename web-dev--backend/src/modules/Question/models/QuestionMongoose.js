//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose')

export const QuestionSchema = new mongoose.Schema({
    question: String,
    answer: String,
    wrongAnswers: [String],
    questionType: ["FIB", "BOL", "MCQ"]
},{
    collection: 'Question',
    autoCreate: true
});

export const Question = mongoose.model('Question', QuestionSchema);

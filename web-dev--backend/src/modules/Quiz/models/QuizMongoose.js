//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose')

import {QuestionSchema} from '../../Question/models/QuestionMongoose.js'


export const QuizSchema = new mongoose.Schema({
    name: String,
    author: String,
    courseId: String,
    questions: [QuestionSchema],
    dateStart: String, 
    dateEnd: String,
    status: {
        type: String,
        enum: ['Available','NotAvailable', 'SpecifiedRange'],
        default: 'Available'
    }
},{
    collection: 'Quiz',
    autoCreate: true
});

export const Quiz = mongoose.model('Quiz', QuizSchema);

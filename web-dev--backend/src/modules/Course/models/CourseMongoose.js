//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose')

import {QuizSchema} from '../../Quiz/models/QuizMongoose.js'
import {ResourceSchema} from '../../Resource/models/ResourceMongoose.js'


export const CourseSchema = new mongoose.Schema({
    courseName: String,
    tutor: String,
    Resource: [ResourceSchema],
    studentList: [String],
    waitingList: [String],
    annoucement: String
},{
    collection: 'Course',
    autoCreate: true
});

export const Course = mongoose.model('Course', CourseSchema);

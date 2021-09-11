//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose')

export const StudentSchema = new mongoose.Schema({
    quiz: [[String]],
    courseGrades: [[String]]
},{
    collection: 'Student',
    autoCreate: true
});

export const Student = mongoose.model('Student', StudentSchema);

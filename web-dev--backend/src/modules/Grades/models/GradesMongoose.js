//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose')



export const GradeSchema = new mongoose.Schema({
    gradeName: String,
    courseId: String,
    score: Number,
},{
    collection: 'Grade',
    autoCreate: true
});

export const Grade = mongoose.model('Grade', GradeSchema);

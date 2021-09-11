//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose')



export const CalendarSchema = new mongoose.Schema({
    assignmentName: String,
    courseId: String,
    dueDate: String,
    dueMonth: String
},{
    collection: 'Calendar',
    autoCreate: true
});

export const Calendar = mongoose.model('Calendar', CalendarSchema);

//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose')

export const ResourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: String,
    fileUrl: String,
    courseId: String,
    status: {
        type: String,
        enum: ['Available','NotAvailable', 'SpecifiedRange'],
        default: 'Available'
    },
    dateStart: String, 
    dateEnd: String

},{
    collection: 'Resource',
    autoCreate: true
});

export const Resource = mongoose.model('Resource', ResourceSchema);

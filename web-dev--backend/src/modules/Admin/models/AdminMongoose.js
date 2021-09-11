//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose')

export const AdminSchema = new mongoose.Schema({
    userId: String,
    roles: [String],
    coursesId: [String]
},{
    collection: 'Admin',
    autoCreate: true
});

export const Admin = mongoose.model('Admin', AdminSchema);

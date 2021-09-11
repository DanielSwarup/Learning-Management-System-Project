//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const mongoose = require('mongoose')

const footerSchema = new mongoose.Schema({
    text: String,
    link: String,
    active: Boolean
},{
    collection: 'Footer',
    autoCreate: true
});

export const Footer = mongoose.model('Footer', footerSchema);

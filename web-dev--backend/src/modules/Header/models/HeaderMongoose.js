//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const mongoose = require('mongoose')

const headerSchema = new mongoose.Schema({
    text: String,
    link: String,
    active: Boolean
},{
    collection: 'Header',
    autoCreate: true
});

export const Header = mongoose.model('Header', headerSchema);

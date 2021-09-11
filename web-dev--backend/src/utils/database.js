//Importing so require() works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import dotenv from 'dotenv';
dotenv.config();

//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = process.env.MONGODB_URI;
mongoose
    .connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) =>{
        console.log(`Database Connected`)
});
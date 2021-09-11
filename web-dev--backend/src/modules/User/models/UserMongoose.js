//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

import {GradeSchema} from '../../Grades/models/GradesMongoose.js'


export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: ['Admin','Tutor', 'Student'],
        default: 'Student'
    },
    coursesId: [String],
    grades: [GradeSchema]

},{
    collection: 'User',
    autoCreate: true,
});

UserSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
//Static Method to login user
UserSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}


export const User = mongoose.model('User', UserSchema);

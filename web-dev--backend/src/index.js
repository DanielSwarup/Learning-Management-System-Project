import express from 'express';
import { ApolloServer } from 'apollo-server-express';

//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

//Firebase
// const functions = require('firebase-functions');

//Env Variables Usage
const  dotenv = require('dotenv');
dotenv.config();

//cookie parser
const cookieParser = require('cookie-parser');

//cors 
var cors = require('cors');

//Express
const app = express();

//JSON Web Token
const jwt = require('jsonwebtoken');


import {User} from'./modules/User/models/UserMongoose.js' //User Schema


//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        'http://localhost:8080',
        'http://192.168.1.15:8080'
    ],
    credentials: true
}))

// const checkUser = (req, res, next) =>{
//     const token = req.cookies.jwt;
//     if(token) {
//         jwt.verify(token, 'hope university coursework secret', async (err, decodedToken)=>{
//             if(err){
//                 console.log(err.message);
//                     // res.status(401).send("Not Working")
//             } else{
//                 console.log(decodedToken);
//                 let user = await User.findById(decodedToken.id)
//                 console.log("It working")
//                 next();
//             }
//         })
//     } else{
//         console.log("Full thing failed")
//         // res.status(401).send("Not Working")
//         next();

//     }
// }
// app.use('*',checkUser)


import { graphqlSchema } from './resolver/resolverIndex.js'

const server = new ApolloServer({ 
    schema: graphqlSchema,
    playground: process.env.NODE_ENV === 'development' ? true : false,
    introspection: true,
    tracing: true,
    path: '/',
    uploads: false
});  


// Connect to Database
import './utils/database.js';

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () => {
    console.log(`Server on http://localhost:${process.env.PORT}`)
});




const maxAge = 3 * 24* 60 * 60;
const createToken = (id) =>{
    return jwt.sign({ id }, 'hope university coursework secret', {
        expiresIn: maxAge
    })
}
//does not work 
const handleErrors = (err) => {
    console.log(error.message, err.code)

    let error = { email: '', password: ''}

    if(err.message.includes('User validation failed')){
        console.log(err)
    }
}



app.post('/login', async function (req, res) {
    const { email, password } = req.body
    try {
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.cookie('UserID', user._id, { maxAge: maxAge * 1000 })

        res.status(200).json({user: user._id})
    } catch (error){
        res.status(400).json({})
    }
})

app.post('/register', async function (req, res) {
    const { email, password, firstName, lastName } = req.body
    try {
        const user = await (User.create({email, password, firstName, lastName}))
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.cookie('UserID', user._id, { maxAge: maxAge * 1000 })

        res.status(201).json({user: user._id})
    } catch (error){
        res.status(400).send({message: "Please check your email and password"})
    }

    // console.log(email, password, firstName, lastName)
})

app.get('/logout', function (req, res) {
    res.cookie('jwt',"", { maxAge: 1})
    res.cookie('UserID', "", { maxAge: 1 })

    res.status(201).send("Logged Out")
})

const multer = require("multer");
// const upload = multer({ dest: "./uploads/" });

const maxSize = 1 * 1000 * 1000;

var upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize }
// mypic is the name of file attribute
}).single("resource");

var fileNameId = ''
var fileId = 0
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        // let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        fileNameId = fileId+"-"+file.originalname
        cb(null,fileNameId)
        fileId += 1
    }
})
var path = require("path");

app.post('/upload_resource', function(req, res, next){
    let upload = multer({ storage: storage }).single('resource');

    upload(req, res, function(err) {
        if(err){
            res.send(err)
            res.status(400)
        }
        else{
            res.json({response: "Success, Image uploaded!", location: `\\uploads\\${fileNameId}`})
            res.status(200)
        }
    });
})

app.post('/get_resource', function(req, res){
    const file = `${process.cwd()}${req.body.location}`;

    res.download(file)
})
// app.post('/get_quizInstructions', function(req, res){
//     const file = `${process.cwd()}/Instruction/quizTemplate.JSON`;
//     res.download(file)
// })
// const jwt = require('jsonwebtoken')

// app.post('/master',  function (req, res) {
// 	const token = req.cookies.jwt
// 	if(token){
//         jwt.verify(token, 'hope university coursework secret', async (err, decodedToken) =>{
//             if(err){
//                 res.status(401).send("Not Working")
//             } else{
//                 console.log(decodedToken);
//                 let user = await User.findById(decodedToken.id)
//                 console.log(req.body)

//                 console.log(decodedToken)
//                 var holder = await fetch('/graphql', { headers: req.headers, body: req.body });




//                res.status(201).send(holder)

//             }
//         })
//     } else {
//         res.status(401).send("Not Working")

//         res.redirect('/login');
//     }
// })




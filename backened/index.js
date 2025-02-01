const express = require('express');
const app = express()

// env ko access krneke lliye
require('dotenv').config();

require('./Models/db'); // databse connection ban jaye
const PORT = process.env.PORT || 8080;

// taskrouter ko import kra
const TaskRouter = require('./Routes/TaskRouter');
const bodyParser = require('body-parser');
const cors = require('cors')

app.get('/',(req,res)=>{
    res.send("hello form yana ")
})

app.use(cors())

// imp thing when u have to take json body from client side
app.use(bodyParser.json());

// middleware add kra
app.use('/tasks',TaskRouter)

// server ko initialize 
app.listen(PORT,()=>{
    console.log(`server is running on PORT= ${PORT}`);
})
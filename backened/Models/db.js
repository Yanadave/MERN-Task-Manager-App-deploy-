// database connection ko establish
const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
  .then(()=>{
    console.log('mongoDB is connected...');
  }).catch((err)=>{
    console.log('mongodb conn error...',err);
  })

require('dotenv').config()
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


async function connectDB(){
    try{
        await mongoose.connect(process.env['MONGODB_CON'], {useNewUrlParser: true,});
        console.log("Connected to server");
    }catch(err){
        console.log(err);
    }
};
// connectDB();





module.exports = {connectDB}
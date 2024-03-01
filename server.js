//Starting file of the project

const express=require('express')
const mongoose=require('mongoose')
const server_config=require('./configs/server.config')
const db_config=require('./configs/db.config')

const app=express();

/**
 * create a admin user at starting of the application
 * if not already present
 */
//connection with MongoDb
mongoose.connect(db_config.DB_URL)

const db=mongoose.connection

db.on("error",()=>{
    console.log("error while connecting to mongoDb")
})
db.once("open",()=>{
    console.log("connected to mongo")
})





//Start the server
app.listen(server_config.PORT,()=>{
    console.log("Server Started at port number :",server_config.PORT)
})



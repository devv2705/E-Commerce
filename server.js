//Starting file of the project

const express = require('express')
const mongoose = require('mongoose')
const server_config = require('./configs/server.config')
const db_config = require('./configs/db.config')
const user_model = require('./models/user.model')
const bcrypt = require('bcryptjs')

const app = express();

/**
 * create a admin user at starting of the application
 * if not already present
 */
//connection with MongoDb
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", () => {
    console.log("error while connecting to mongoDb")
})
db.once("open", () => {
    console.log("connected to mongo")
    init()
})

async function init() {

    try {

        let user = await user_model.findOne({ userId: "admin" });
        if (user) {
            console.log("user is already present")
            return
        }

    } catch (err) {
        console.log("error while reading data", err)
    }


    try {
        user = await user_model.create({
            name: "dev",
            userId: "admin",
            email: "pd2752003@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("Dev@2705", 8)
        })
        console.log("admin created", user)


    } catch (err) {
        console.log("error while creating admin user", err)
    }



}


//Start the server
app.listen(server_config.PORT, () => {
    console.log("Server Started at port number :", server_config.PORT)
})



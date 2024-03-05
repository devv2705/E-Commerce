//Starting file of the project

const express = require('express')
const mongoose = require('mongoose')
const server_config = require('./configs/server.config')
const db_config = require('./configs/db.config')
const user_model = require('./models/user.model')
const bcrypt = require('bcryptjs')
const app = express();
app.use(express.json()) //this is middleware bcoz when we hit req through postman it was in json and our app can not direct understand json 

//it tell the app that whenever json is pass ,you have to read as jsobject

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

//stich the route to the server

//calling routes and passing app object
require("./routes/auth.route")(app)
require("./routes/category.route")(app)
require("./routes/product.route")(app)


//Start the server
app.listen(server_config.PORT, () => {
    console.log("Server Started at port number :", server_config.PORT)
})



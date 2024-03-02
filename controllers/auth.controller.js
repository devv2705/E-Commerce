/**
 * i need to write controller or logic for user registration
 */
const bcrypt = require('bcryptjs')
const user_model=require("../models/user.model")

exports.signup = async(req,res)=>{
    /** logic to create user */

    //1.read the req body

    const request_body=req.body  //this will get me req body in js object

    //2.insert the data in user collection in mongodb

    const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8)
    }

    try{
       const user_created = await user_model.create(userObj)

       //but i dont want to send password on response and other sensitive info so i extract info and then send to postman

       //made copy of object so hide the pass
       const res_Obj={
            name:user_created.name,
            userId:user_created.userId,
            email:user_created.email,
            userType:user_created.userType,
            createdAt:user_created.createdAt,
            updatedAt:user_created.updatedAt
       }

       //return this user : 201 indicates success
       res.status(201).send(res_Obj)
        

    }catch(err){
        console.log("error while registering the user",err)
        res.status(500).send({
            message:"some error happen while registering the user",
            error:err.message
        })
        //500 indicates server error
    }
}
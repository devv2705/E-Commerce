/**
 * (THIS LAYER IS LIES BETWEEN ROUTES AND CONTROLLER)
 * (option thing to inhance the code)
 * 
 * create a middleware which checks the request body is proper and correct
 */

const user_model=require("../models/user.model")

const verify_SignUp_Body=async (req,res,next)=>{

        try{

            //check for name

            if(!req.body.name){
                return res.status(400).send({
                    message:"failed ! Name was not provided"
                })
            }
            //check for email

            if(!req.body.email){
                return res.status(400).send({
                    message:"failed ! Email was not provided"
                })
            }

            //check for userId
            if(!req.body.userId){
                return res.status(400).send({
                    message:"failed ! UserId was not provided"
                })
            }

            //check if the user with same user id is present
            const user=await user_model.findOne({userId:req.body.userId})
            if(user){
                return res.status(400).send({
                    message:"failed ! UserId is already present"
                })

            }

            next();


        }catch(err){
            console.log("Error while validating req object",err)
            res.status(500).send({
                message:"Error while validating req body"
            })
        }

}

const verify_Signin_Body=async (req,res,next)=>{

    if(!req.body.userId){
        return res.status(400).send({
            message:"userId is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message:"password is not provided"
        })
    }

    next()


}

module.exports={
    verifySignUpBody:verify_SignUp_Body,
    verify_Signin_Body:verify_Signin_Body
}
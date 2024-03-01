/**
 * POST : localhost:8888/ecomm/api/v1/auth/signup
 * 
 * need to intercept this
 */

const auth_controller=require("../controllers/auth.controller")

module.exports=(app)=>{
    //if post call comes from above uri then give the controll to the signup 

    app.post("/ecomm/api/v1/auth/signup",auth_controller.signup)

    

    

}


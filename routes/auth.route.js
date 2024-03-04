
const authController = require("../controllers/auth.controller")

const authMw = require("../middlewares/auth_mw")

module.exports = (app) => {
/**
 * POST : localhost:8888/ecomm/api/v1/auth/signup
 * 
 * need to intercept this
 */

    //if post call comes from above uri then give the controll to the signup 

    app.post("/ecomm/api/v1/auth/signup", [authMw.verifySignUpBody], authController.signup)

    //here i have appied middle ware for req varify in [].
    //once it varify through mw then it pass for registration



    /**
     * crete route for sign in
     * POST : localhost:8888/ecomm/api/v1/auth/signin
     */
    app.post("/ecomm/api/v1/auth/signin",[authMw.verify_Signin_Body],authController.signin)

   


}


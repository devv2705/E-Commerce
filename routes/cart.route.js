const cartController=require("../controllers/cart.controller")

const auth_mw=require("../middlewares/auth_mw")

module.exports=(app)=>{
    /**
     * add product
     * POST :localhost:8888/ecomm/api/v1/addtocart
     */
    app.post("/ecomm/api/v1/addtocart",[auth_mw.verify_Token,auth_mw.isAdmin],cartController.addToCart)

}
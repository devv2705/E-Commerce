const cartController=require("../controllers/cart.controller")

const auth_mw=require("../middlewares/auth_mw")

module.exports=(app)=>{
    /**
     * add product
     * POST :localhost:8888/ecomm/api/v1/addtocart
     */
    app.post("/ecomm/api/v1/addtocart",[auth_mw.verify_Token,auth_mw.isAdmin],cartController.addToCart)

    /**
     * delete from cartproduct
     * POST :localhost:8888/ecomm/api/v1/deletecart
     */
    app.post("/ecomm/api/v1/deletecart",[auth_mw.verify_Token,auth_mw.isAdmin],cartController.delFromCart)


    /**
     * delete from cartproduct
     * POST :localhost:8888/ecomm/api/v1/readcart
     */
    app.get("/ecomm/api/v1/readcart",[auth_mw.verify_Token,auth_mw.isAdmin],cartController.readCart)
}
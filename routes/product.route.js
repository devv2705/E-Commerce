const proController=require("../controllers/product.controller")

const auth_mw=require("../middlewares/auth_mw")

module.exports=(app)=>{
    /**
     * add product
     * POST :localhost:8888/ecomm/api/v1/add_products
     */
    app.post("/ecomm/api/v1/add_products",[auth_mw.verify_Token,auth_mw.isAdmin],proController.addProduct)
}
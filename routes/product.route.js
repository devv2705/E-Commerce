const proController=require("../controllers/product.controller")

const auth_mw=require("../middlewares/auth_mw")

module.exports=(app)=>{
    /**
     * add product
     * POST :localhost:8888/ecomm/api/v1/add_products
     */
    app.post("/ecomm/api/v1/add_products",[auth_mw.verify_Token,auth_mw.isAdmin],proController.addProduct)

    /**
     * delete product
     * POST :localhost:8888/ecomm/api/v1/delete_products
     */

    app.post("/ecomm/api/v1/delete_products",[auth_mw.verify_Token,auth_mw.isAdmin],proController.deleteProduct)

    /**
     * find product
     * get :localhost:8888/ecomm/api/v1/find_products
     */

    app.get("/ecomm/api/v1/find_products",[auth_mw.verify_Token],proController.findProduct);

    
}
const catController=require("../controllers/category.controller")

const auth_mw=require("../middlewares/auth_mw")

module.exports=(app)=>{

    /**
 * API for creating new category
 * POST localhost:8888/ecomm/api/v1/categories
 */
    app.post("/ecomm/api/v1/categories",[auth_mw.verify_Token,auth_mw.isAdmin],catController.createNewCategory)


    /**
     * API for deleting category
     * POST : localhost:8888/ecomm/api/v1/deletecategories
     */
    app.delete("/ecomm/api/v1/deletecategories",[auth_mw.verify_Token,auth_mw.isAdmin],catController.deleteCategory)

     /**
     * read the category from db
     * GET : localhost:8888/ecomm/api/v1/readcategories
     */
    app.get("/ecomm/api/v1/readcategories",[auth_mw.verify_Token],catController.readCategory)


    /**
     * update the category name
     * POST : localhost:8888/ecomm/api/v1/updatecategories
     */
    app.post("/ecomm/api/v1/updatecategories",[auth_mw.verify_Token,auth_mw.isAdmin],catController.updateCategory)

    
}

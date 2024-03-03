const catController=require("../controllers/category.controller")

const auth_mw=require("../middlewares/auth_mw")

module.exports=(app)=>{

    /**
 * API for creating new category
 * POST localhost:8888/ecomm/api/v1/categories
 */
    app.post("/ecomm/api/v1/categories",[auth_mw.verify_Token],catController.createNewCategory)

}

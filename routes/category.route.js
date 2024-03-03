const catController=require("../controllers/category.controller")


module.exports=(app)=>{

    /**
 * API for creating new category
 * POST localhost:8888/ecomm/api/v1/categories
 */
    app.post("/ecomm/api/v1/categories",catController.createNewCategory)

}

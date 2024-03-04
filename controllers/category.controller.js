
/**
 * controller for creating Category
*/

const category_model=require("../models/category.model")

exports.createNewCategory=async (req,res)=>{
    
    //read the req body

     //create the category
     //here i direct read and create the category
    const cat_data={
        name:req.body.name,
        description:req.body.description
    }

    //insert into mongoDb
    //return the response of created category
    try{
       const category=await category_model.create(cat_data)

       return res.status(201).send(category)

    }catch(err){
        console.log("error while insert new category in the dB",err)
        return res.status(500).send({
            message:"Error while creating the category"
        })
    }

    
}

exports.deleteCategory=async(req,res)=>{
    //read the request
    //delete from db

    try{
    const del_cat=await category_model.deleteOne({name:req.body.name})
    if (!del_cat) {
        return res.status(400).send({
            message: "Category name is required in the query parameters",
        });
    }
      return res.status(201).send(del_cat)

    }catch(err){
        console.log("Error !!! in deleteCategory function",err)
        return res.status(500).send({
            message:"Error while deleting the catgory"
        })

    }

}

exports.readCategory = async (req, res) => {
    try {
        const categoryName = req.body.name;

        if (!categoryName) {
            return res.status(400).send({
                message: "Category name is required in the query parameters",
            });
        }

        const category = await category_model.findOne({ name: categoryName });

        if (!category) {
            return res.status(404).send({
                message: "Category not found",
            });
        }

        return res.status(200).send(category);
    } catch (err) {
        console.log("Error while finding the category", err);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const currentName = req.body.name;
        const newName = req.body.updateName;

        if (!currentName || !newName) {
            return res.status(400).send({
                message: "Both currentName and updateName are required in the request body",
            });
        }

        const category = await category_model.findOne({ name: currentName });

        if (!category) {
            return res.status(404).send({
                message: "Category not found",
            });
        }

        // Update the name of the category
        category.name = newName;
        const updatedCategory = await category.save();

        return res.status(200).send(updatedCategory);
    } catch (err) {
        console.log("Error while updating the category", err);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }
};


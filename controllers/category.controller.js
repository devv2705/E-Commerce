
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

const product_model=require("../models/product.model")
const category_model=require("../models/category.model")


exports.addProduct= async(req,res)=>{

    try{

    const cat=req.body.category
    const product={
        name:req.body.name,
        imageUrl:req.body.imageUrl,
        price:req.body.price,
        description:req.body.description
    }
    const category=await category_model.findOne({name:cat})
    
    if (!category) {
        return res.status(404).send({ message: "Category not found" });
    }

    await category.product.push(product)
    await category.save();


    return res.status(201).send(category)


    }catch(err){
        console.log("error on add product to dB",err)
        return res.status(500).send({
            message:"error occure while adding the product details to db"
        })
    }

}
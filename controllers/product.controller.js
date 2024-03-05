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

exports.deleteProduct = async (req, res) => {
    try {
        const productName = req.body.name;

        //here we can use simple pull method but i want to return the updated category
        //so i write this complicated version

        const updatedCategory = await category_model.findOneAndUpdate(
            { "product.name": productName },
            { $pull: { product: { name: productName } } },
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).send({
                message: "Category not found or product not present in the category"
            });
        }

        return res.status(200).send(updatedCategory.product);
        
    } catch (err) {
        console.error("Error on deleting product from DB:", err);
        return res.status(500).send({ message: `Error occurred while deleting the product from DB: ${err.message}` });
    }
};

exports.findProduct = async (req, res) => {
    try {
        const productName = req.body.name;

        const category = await category_model.findOne({ "product.name": productName });

        if (!category) {
            return res.status(404).send({
                message: "Product not found in any category"
            });
        }

        const product = category.product.find(product => product.name === productName);

        if (!product) {
            return res.status(404).send({
                message: "Product not found in the specified category"
            });
        }
        return res.status(200).send(product);
        
    } catch (err) {
        console.log("Error while fetching the product details", err);
        return res.status(500).send({
            message: "Error occurred while fetching the product"
        });
    }
};

const cart_model = require("../models/cart.model");
const category_model = require("../models/category.model");

exports.addToCart = async (req, res) => {
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

        let cartItem = await cart_model.findOne({ name: productName });

        //we can also use findandupdate method so no need to use save()
        //but im using manual approach 
        if (cartItem) {
            // If the product is already in the cart, update the quantity
            cartItem.quantity += 1;
            await cartItem.save();
        
            return res.status(201).send({
                message: `Quantity updated to ${cartItem.quantity}`
            });
        }
        

        // If the product is not in the cart, create a new cart item
        const cart = {
            name: productName,
            quantity: 1,
            price: product.price
        };

        const cartField = await cart_model.create(cart);

        return res.status(201).send(cartField);
    } catch (err) {
        console.log("Error while adding product to cart", err);

        return res.status(500).send({
            message: "Error! Unable to add the product to the cart"
        });
    }
};



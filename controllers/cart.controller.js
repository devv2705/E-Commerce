const cart_model = require("../models/cart.model");
const category_model = require("../models/category.model");
const product = require("../models/product.model");
const mongoose = require('mongoose')

exports.addToCart = async (req, res) => {
    try {
        const productName = req.body.name;

        // Get the logged-in user's ID from the token
        const userId = req.user._id;

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

        let cartItem = await cart_model.findOne({ name: productName, user: userId });

        // Use findAndUpdate method to update the quantity
        if (cartItem) {
            await cart_model.findOneAndUpdate(
                { name: productName, user: userId },
                { $inc: { quantity: 1 } }
            );

            return res.status(201).send({
                message: `Quantity updated to ${cartItem.quantity + 1}`
            });
        }

        // If the product is not in the cart, create a new cart item
        const cart = {
            name: productName,
            quantity: 1,
            price: product.price,
            user: userId
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

exports.delFromCart = async (req, res) => {
    try {
        const productName = req.body.name;
        const userId = req.user._id;  // Assuming req.user contains the logged-in user details

        // Ensure that the userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({
                message: "Invalid user ID"
            });
        }

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

        let cartItem = await cart_model.findOne({ name: productName, user: userId });

        if (!cartItem) {
            return res.status(404).send({
                message: "Product not found in the user's cart"
            });
        }

        const quantity = cartItem.quantity;

        if (quantity !== 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
            return res.status(200).send({
                message: `1 quantity of ${productName} deleted`
            });
        } else {
            await cart_model.deleteOne({ name: productName, user: userId });
            return res.status(200).send({
                message: `Remove ${productName} from the cart`
            });
        }
    } catch (err) {
        console.error("Error occurred while deleting from cart", err);
        return res.status(500).send({
            message: "Error while deleting product from cart"
        });
    }
};



exports.readCart = async (req, res) => {
    try {
        const userId = req.user._id;

        // If api hit through name then it will return that name product detail
        // But if req.body is empty then return the whole cart of the logged-in user
        const productName = req.body.name;

        if (!productName) {
            const cart = await cart_model.find({ user: userId });
            return res.status(201).send(cart);
        } else {
            const data = await cart_model.findOne({ name: productName, user: userId });
            return res.status(201).send(data);
        }
    } catch (err) {
        console.log("Error while fetching cart data", err);
        return res.status(500).send({
            message: "Error occurred while fetching the cart detail"
        });
    }
};


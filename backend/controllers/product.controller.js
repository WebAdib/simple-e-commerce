import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Get all products from the database
        res.status(200).json({ success: true, data: products }); // Send a success response with the products
    } catch (error) {
        console.error("Error retrieving products", error.msg);  // Log the error to the console
        res.status(500).json({ success: false, msg: 'Server Error' });  // Send a 500 server error response if something fails
    }
};

export const createProduct = async (req, res) => { // Define a POST route for adding a new product
    const product = req.body;  // Extract the product data from the request body

    if (!product.name || !product.price || !product.image) { // Check if required fields are missing
        return res.status(400).json({ success: false, msg: 'Please Provide all fields' }); // Send a 400 error if fields are missing
    }

    const newProduct = new Product(product);  // Create a new instance of the Product model

    try {
        await newProduct.save();  // Save the new product to the database
        res.status(201).json({ success: true, msg: 'Product added successfully', data: newProduct });  // Send a success response if saved
    } catch (error) {
        console.error("Error creating new product", error.msg);  // Log the error to the console
        res.status(500).json({ success: false, msg: 'Server Error' });  // Send a 500 server error response if something fails
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, msg: 'Product updated successfully', data: updatedProduct }); // Send a success response if updated
    } catch (error) {
        
        res.status(500).json({ success: false, message: "Server Error" });
    }
    
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }
    
    try {
        await Product.findByIdAndDelete(id); // Delete the product
        res.status(200).json({ success: true, msg: 'Product deleted successfully' }); // Send a success response if deleted
    } catch (error) {
        console.log("Error deleting product", error.msg); // Log the error to the
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};
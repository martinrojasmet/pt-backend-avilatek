import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const createProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        const { name, description, price, stock } = req.body;

        const alreadyExists = await Product.findOne({ name });
        if (alreadyExists) {
            const error = new Error('Product already exists');
            error.statusCode = 409;
            throw error;
        }

        const newProducts = await Product.create([{ name, description, price, stock }], { session });
        
        await session.commitTransaction();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProducts[0]
        });
        
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const getAllProducts = async (req, res, next) => {
    try {
        const Products = await Product.find().select('-createdAt -updatedAt -__v');
         
        res.status(200).json({
            success: true,
            data: Products
        });
    } catch (error) {
        next(error);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).select('-createdAt -updatedAt -__v');

        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }
         
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, description, price, stock } = req.body;

        if (!name && !description && !price && !stock) {
            return res.status(400).json({
                success: false,
                message: "At least one field must be provided to update"
            });
        }

        const updateFields = {};
        if (name !== undefined) updateFields.name = name;
        if (description !== undefined) updateFields.description = description;
        if (price !== undefined) updateFields.price = price;
        if (stock !== undefined) updateFields.stock = stock;

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateFields, { new: true, session });

        await session.commitTransaction();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id, { session });

        await session.commitTransaction();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};
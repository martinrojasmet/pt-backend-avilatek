import mongoose from 'mongoose';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';

export const createOrder = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        const { items } = req.body;

        for (let i = 0; i < items.length; i++) {
            const product = await Product.findById(items[i].product);
            if (!product) {
                const error = new Error('Product not found');
                error.statusCode = 404;
                throw error;
            }
            if (product.stock < items[i].quantity) {
                const error = new Error('Product out of stock');
                error.statusCode = 400;
                throw error;
            }
            product.stock -= items[i].quantity;
            await product.save({ session });
        }

        const newOrders = await Order.create([{ user: req.user._id, items }], { session });
        
        await session.commitTransaction();

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: newOrders[0]
        });
        
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const Orders = await Order.find().select('-createdAt -updatedAt -__v');
         
        res.status(200).json({
            success: true,
            data: Orders
        });
    } catch (error) {
        next(error);
    }
};

export const getAllOrdersUser = async (req, res, next) => {
    try {
        const Orders = await Order.find({ user: req.params.id }).select('-createdAt -updatedAt -__v');
         
        res.status(200).json({
            success: true,
            data: Orders
        });
    } catch (error) {
        next(error);
    }
};

export const getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).select('-createdAt -updatedAt -__v');

        if (!order) {
            const error = new Error('Order not found');
            error.statusCode = 404;
            throw error;
        }
         
        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};

export const updateOrder = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { items, status } = req.body;

        const order = await Order.findByIdAndUpdate(req.params.id, items, status, { new: true, session });

        await session.commitTransaction();

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: order
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id, { session });

        await session.commitTransaction();

        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
            data: deletedOrder
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const cancelOrder = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            const error = new Error('Order not found');
            error.statusCode = 404;
            throw error;
        }

        if (order.status === 'Cancelled') {
            const error = new Error('Order already cancelled');
            error.statusCode = 400;
            throw error;
        }

        if (order.status === 'Confirmed') {
            const error = new Error('Order already confirmed');
            error.statusCode = 400;
            throw error;
        }

        for (let i = 0; i < order.items.length; i++) {
            const product = await Product.findById(order.items[i].product);
            product.stock += order.items[i].quantity;
            await product.save({ session });
        }

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status: 'Cancelled' }, { new: true, session });
        
        await session.commitTransaction();

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            data: updatedOrder
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const confirmOrder = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            const error = new Error('Order not found');
            error.statusCode = 404;
            throw error;
        }

        if (order.status === 'Cancelled') {
            const error = new Error('Order already cancelled');
            error.statusCode = 400;
            throw error;
        }

        if (order.status === 'Confirmed') {
            const error = new Error('Order already confirmed');
            error.statusCode = 400;
            throw error;
        }

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status: 'Confirmed' }, { new: true, session });
        
        await session.commitTransaction();

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            data: updatedOrder
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};
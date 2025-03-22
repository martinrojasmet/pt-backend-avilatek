import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}, { _id: false });


/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       title: 'Order'
 *       required: [ 'user', 'items', 'status' ]
 *       properties:
 *         user: { type: 'string' }
 *         items: 
 *           type: 'array'
 *           items: 
 *             type: 'object'
 *             properties:
 *               product: { type: 'string' }
 *               quantity: { type: 'number' }
 *         status: 
 *           type: 'string'
 *           enum: ['Pending', 'Confirmed', 'Cancelled']
 *         _id: { type: 'string' }
 *         createdAt: { type: 'string', format: 'date-time' }
 *         updatedAt: { type: 'string', format: 'date-time' }
 */
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    items: {
        type: [orderItemSchema],
        required: true,
        validate: [val => val.length > 0, 'The order must contain at least one product']
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Confirmed", "Cancelled"],
        default: "Pending"
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
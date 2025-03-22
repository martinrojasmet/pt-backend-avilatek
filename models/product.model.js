import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       title: 'Product'
 *       required: [ 'name', 'description', 'price', 'stock' ]
 *       properties:
 *         name: { type: 'string' }
 *         description: { type: 'string' }
 *         price: { type: 'number' }
 *         stock: { type: 'number' }
 *         _id: { type: 'string' }
 *         createdAt: { type: 'string', format: 'date-time' }
 *         updatedAt: { type: 'string', format: 'date-time' }
 */
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
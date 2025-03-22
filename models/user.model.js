import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       title: 'User'
 *       required: [ 'name', 'email', 'password' ]
 *       properties:
 *         name: { type: 'string' }
 *         email: { type: 'string' }
 *         password: { type: 'string' }
 *         role: { type: 'string' }
 *         _id: { type: 'string' }
 *         createdAt: { type: 'string', format: 'date-time' }
 *         updatedAt: { type: 'string', format: 'date-time' }
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
        validate: {
            validator: function(name) {
                return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/.test(name);
            },
            message: "The name must contain only letters and spaces"
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 150
    },
    role: {
        type: String,
        default: 'client'
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
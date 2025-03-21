import mongoose from "mongoose";

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
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    fullname: {
        type: String,
        required: true
    },
    avarar: {
        type: String, //Cloudinary URL
        required: true
    },
    coverImage: {
        type: String, //Cloudinary URL
    },
    watchHistory: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refrshToken: {
        type: String
    },
},
{
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods = {
    async matchPassword(password) {
        return await bcrypt.compare(password, this.password);
    },
    generateAccessToken() {
        return jwt.sign({ 
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.name,
         }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
    },
    generateRefreshToken() {
        return jwt.sign({
            _id: this._id
        },
         process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
    }
}

export const User = mongoose.model('User', userSchema);
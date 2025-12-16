import mongoose from "mongoose";

export const logSchema = new mongoose.Schema({
    level: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const LogModel = mongoose.model('Log', logSchema);
import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name: {type: String, required: true},
    login: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    created_At: {type: Date, default: Date.now},
});

export const userModel = mongoose.model('User', userSchema)
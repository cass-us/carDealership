import mongoose from "mongoose";
import mongooseAutoIncrement from "mongoose-sequence";  


const AutoIncrement = mongooseAutoIncrement(mongoose);

const userSchema = new mongoose.Schema({
    id: { type: Number, unique: true },  
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    idNumber: { type: String,  unique: true },
    mobileNumber: { type: String },
    role: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' },
}, { timestamps: true });


userSchema.plugin(AutoIncrement, { inc_field: 'id' });

const User = mongoose.model('User', userSchema);

export default User;

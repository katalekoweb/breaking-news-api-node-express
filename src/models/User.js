import mongoose from 'mongoose';
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true, lowercase: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, select: false},
    avatar: {type: String},
    background: {type: String}
})

UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
})

const User = mongoose.model("User", UserSchema)
// module.exports = User
export default User
import User from "../models/User.js"
import jwt from "jsonwebtoken"

const findByEmail = (email) => User.findOne({ email }).select('+password') // select password to compare with the one provided by the user

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export default { findByEmail, generateToken }
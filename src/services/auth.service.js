import User from "../models/User.js"

const findByEmail = (email) => User.findOne({ email }).select('+password') // select password to compare with the one provided by the user

export default { findByEmail }
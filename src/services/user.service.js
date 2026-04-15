import User from "../models/User.js"
import userRepository from "../repositories/user.repository.js";

const create = async (body) => {
    const { name, username, email, password, avatar, background } = body;

    if (!name && !username && !email && !password && !avatar && !background) {
        throw new Error( "Submit all required fields" );
    }

    const findUser = await userRepository.findByEmail(email)
    const findUserByUsername = await userRepository.findByUsername(username)

    let validateMessages = "";
    if (findUser) validateMessages+="This email was alreday registered"
    if (findUserByUsername) validateMessages+= validateMessages ? "\nThis username was alreaday registered" : "This username was alreaday registered" 

    if (findUser || findUserByUsername) throw new Error( validateMessages);

    const user = await userRepository.create(body)

    if (!user) {
        throw new Error("Error creating user");
    }

    return {
        id: user._id,
        name,
        username,
        email,
        avatar,
        background,
    }
    
}

const findAll = () => User.find()
const findById = (id) => User.findById(id)
const findByUsername = (username) => User.findOne({ username })
const update = (id, body) => User.findByIdAndUpdate(id, body, {new: true}) // new: true returns the updated document

export default { create, findAll, findById, findByUsername, update }
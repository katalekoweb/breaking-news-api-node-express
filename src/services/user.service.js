import User from "../models/User.js"

const create = (body) => User.create(body)
const findAll = () => User.find()
const findById = (id) => User.findById(id)
const update = (id, body) => User.findByIdAndUpdate(id, body, {new: true}) // new: true returns the updated document

export default { create, findAll, findById, update }
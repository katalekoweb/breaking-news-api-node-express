import Post from "../models/Post.js"

const getAll = (limit, offset) => Post.find().sort({_id: -1}).skip(offset).limit(limit).populate("user")

const countDocuments = () => Post.countDocuments()

const create = (body) => Post.create(body)

const update = (id, body) => Post.findByIdAndUpdate(id, body, { new: true })

const deletePost = (id) => Post.findByIdAndDelete(id)

export default { create, getAll, countDocuments, update, delete: deletePost }
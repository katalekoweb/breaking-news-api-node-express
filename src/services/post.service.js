import Post from "../models/Post.js"

const getAll = () => Post.find()

const create = (body) => Post.create(body)

const update = (id, body) => Post.findByIdAndUpdate(id, body, { new: true })

const deletePost = (id) => Post.findByIdAndDelete(id)

export default { create, getAll, update, delete: deletePost }
import Post from "../models/Post.js"

const getAll = (limit, offset) => Post.find().sort({_id: -1}).skip(offset).limit(limit).populate("user")

const countDocuments = () => Post.countDocuments()

const create = (body) => Post.create(body)

const findById = (id) => Post.findById(id).populate("user")

const featured = () => Post.findOne().sort({_id: -1}).populate("user")

const update = (id, body) => Post.findByIdAndUpdate(id, body, { new: true })

const deletePost = (id) => Post.findByIdAndDelete(id)

const searchByTitle = (title) => Post.find({
        title: {$regex: `${title || ""}`, $options: "i"},
    })
    .sort({_id: -1})
    .populate("user")

const findByUser = (id) => Post.find({user:id}).sort({_id: -1}).populate("user")

export default { create, getAll, searchByTitle, findById, featured, findByUser, countDocuments, update, deletePost }
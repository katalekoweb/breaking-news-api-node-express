import Post from "../models/Post.js"

const getAll = (limit, offset) => Post.find().sort({_id: -1}).skip(offset).limit(limit).populate("user")

const countDocuments = () => Post.countDocuments()

const create = (body) => Post.create(body)

const findById = (id) => Post.findById(id).populate("user")

const featured = () => Post.findOne().sort({_id: -1}).populate("user")

const update = (id, body) => Post.findOneAndUpdate({ _id: id }, body, { rawResult: true })

const deletePost = (id) => Post.findByIdAndDelete(id)

const searchByTitle = (title) => Post.find({
        title: {$regex: `${title || ""}`, $options: "i"},
    })
    .sort({_id: -1})
    .populate("user")

const findByUser = (id) => Post.find({user:id}).sort({_id: -1}).populate("user")

const like = async (id, userId) => Post.findOneAndUpdate({_id: id, "likes.userId": {$nin: [userId]}}, {$push: {likes: {userId, createdAt: new Date()}}}, { new: true }) 
const unlike = async (id, userId) => Post.findOneAndUpdate({_id: id}, {$pull: {likes: {userId}}}, { new: true }) 

export default { create, getAll, searchByTitle, findById, featured, findByUser, countDocuments, update, like, unlike, deletePost }
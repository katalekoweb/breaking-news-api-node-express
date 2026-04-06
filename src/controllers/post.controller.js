import postService from "../services/post.service.js";
import mongoose from "mongoose";

const getAll = async (req, res) => {
  try {
    const posts = await postService.getAll();

    if (posts.length === 0) return res.status(404).send({ message: "No posts found" });

    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({ message: "Error: ", error: error.message });
  }
};

const create = async (req, res) => {
  try {
    
    const { title, text, banner } = req.body;
    if (!title || !text || !banner)
      return res
        .status(400)
        .send({ message: "Title, text and banner are required" });

    const data = req.body;
    data.user = new mongoose.Types.ObjectId(req.userId);

    const post = await postService.create(data);
    res.status(201).send({message: "Post created", post});
  } catch (error) {
    res.status(500).send({ message: "Error: ", error: error.message });
  }
};

const update = async (req, res) => {
  const id = req.params.id;

  try {
    await postService.update(id, req.body);
    res.status(200).send({ message: "Post updated" });
  } catch (error) {
    res.status(500).send({ message: "Error: ", error: error.message });
  }
};

const destroy = async (req, res) => {
  const id = req.params.id;

  try {
    await postService.deletePost(id);
    res.status(200).send({ message: "Post deleted" });
  } catch (error) {
    res.status(500).send({ message: "Error: ", error: error.message });
  }
};

export default { getAll, create, update, destroy };

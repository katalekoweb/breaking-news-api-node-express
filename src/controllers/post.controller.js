import postService from "../services/post.service.js";
import mongoose from "mongoose";

const getAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit) || 3;
    offset = Number(offset) || 0;

    const posts = await postService.getAll(limit, offset);
    const total = await postService.countDocuments();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit >= 0 ? offset - limit : null;
    const previousUrl =
      previous !== null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (posts.length === 0)
      return res.status(404).send({ message: "No posts found" });

    res.status(200).send({
      nextUrl,
      previousUrl,
      total,
      offset,
      limit,
      results: posts.map((post) => ({
        id: post._id,
        title: post.title,
        text: post.text,
        banner: post.banner,
        user: {
          id: post.user._id,
          name: post.user.name,
          username: post.user.username,
          email: post.user.email,
          avatar: post.user.avatar,
        },
        likes: post.likes,
        comments: post.comments,
        createdAt: post.createdAt,
      })),
    });
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
    res.status(201).send({ message: "Post created", post });
  } catch (error) {
    res.status(500).send({ message: "Error: ", error: error.message });
  }
};

const featured = async (req, res) => {
  try {
    const post = await postService.featured();

    if (!post)
      return res.status(404).send({ message: "No featured post found" });

    res.status(200).send({
      post: {
        id: post._id,
        title: post.title,
        text: post.text,
        banner: post.banner,
        user: {
          id: post.user._id,
          name: post.user.name,
          username: post.user.username,
          email: post.user.email,
          avatar: post.user.avatar,
        },
        likes: post.likes,
        comments: post.comments,
        createdAt: post.createdAt,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "Error: ", error: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postService.findById(id);

    if (!post) return res.status(404).send({ message: "Post not found" });

    res.status(200).send({
      post: {
        id: post._id,
        title: post.title,
        text: post.text,
        banner: post.banner,
        user: {
          id: post.user._id,
          name: post.user.name,
          username: post.user.username,
          email: post.user.email,
          avatar: post.user.avatar,
        },
        likes: post.likes,
        comments: post.comments,
        createdAt: post.createdAt,
      },
    });
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

export default { getAll, create, findById, featured, update, destroy };

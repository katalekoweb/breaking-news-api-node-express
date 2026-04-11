import postService from "../services/post.service.js";
import userService from "../services/user.service.js";
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

    if (!req.body.title && !req.body.text && !req.body.banner) return res.status(400).send({ message: "Please at least one of title, text or banner is required" });

    const post = await postService.findById(id);

    if (!post) return res.status(404).send({ message: "Post not found" });

    if (post.user._id.toString() !== req.userId) return res.status(403).send({ message: "You are not the owner of this post" });

    await postService.update(id, req.body);
    res.status(200).send({ message: "Post updated" });
  } catch (error) {
    res.status(500).send({ message: "Error: ", error: error.message });
  }
};

const destroy = async (req, res) => {
  const id = req.params.id;

  try {

    const post = await postService.findById(id);

    if (!post) return res.status(404).send({ message: "Post not found" });

    if (post.user._id.toString() !== req.userId) return res.status(403).send({ message: "You are not the owner of this post" });

    await postService.deletePost(id);
    res.status(200).send({ message: "Post deleted successfully" });

  } catch (error) {
    res.status(500).send({ message: "Error: ", error: error.message });
  }
};

const searchByTitle = async (req, res) => {
  try {
    const title = req.query.title;

    const posts = await postService.searchByTitle(title);

    if (posts.length === 0) {
      return res.status(400).send({
        message: "There are no posts with this words",
      });
    }

    res.status(200).send({
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

const findByUser = async (req, res) => {
  try {
    const username = req.params.username;

    // get the user
    const user = await userService.findByUsername(username);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const posts = await postService.findByUser(user?.id);

    if (posts.length === 0) {
      return res.status(400).send({
        message: "There are no posts with this words",
      });
    }

    res.status(200).send({
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
  } catch (err) {
    res.status(500).send({ message: "Error: ", error: error.message });
  }
  
};

const like = async (req, res) => {
  try {
    const id = req.params.id;
    let post = await postService.findById(id);

    if (!post) return res.status(404).send({ message: "Post not found" });

    const userId = req.userId;

    const liked = await postService.like(id, userId);

    if (!liked) {
      const unlike = await postService.unlike(id, userId);
      post = await postService.findById(id);
      res.status(200).send({ message: "Post unliked", post });
    }
    
    post = await postService.findById(id);
    res.status(200).send({ message: "Post liked", post });

  } catch (error) {
    res.status(500).send({ message: "Error: ", error: error.message });
  }
}

const addComment = async (req, res) => {
  try {

    const postId = req.params.id
    const userId = req.userId
    const comment = req.body.comment

    if (!comment) { // 400 - bad request
      return res.status(400).send({ message: "Comment is required" })
    }

    await postService.addComment(postId, userId, comment)
    res.status(200).send({ message: "Comment added successfully" })

  } catch (error) {
    res.status(500).send({ message: "Error: ", error: error.message });
  }

}

const deleteComment = async (req, res) => {
  try {
    const postId = req.params.postId
    const commentId = req.params.commentId

    const commentDeleted = await postService.deleteComment(postId, commentId, req.userId)

    const commentFinder = commentDeleted.comments.find(
      (comment) => comment.commentId === commentId
    )
    
    if (!commentFinder) {
      return res.status(404).send({message: "Comment not found"})
    }

    if (commentFinder.userId !== req.userId) {
      return res.status(400).send({message: "You are not the owner of this comment"})
    }
    
    res.status(200).send({ message: "Comment deleted successfully" })

  } catch (error) {
    res.status(500).send({ message: "Error: ", error: error.message });
  }
}

export default {
  getAll,
  create,
  findById,
  findByUser,
  featured,
  update,
  like,
  destroy,
  searchByTitle,
  addComment,
  deleteComment
};

import postController from "../controllers/post.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import {Router} from "express"
import route from "./user.route.js";
const router = Router();

router.get("/", postController.getAll)
router.post("/", authMiddleware, postController.create)
router.get("/search", authMiddleware, postController.searchByTitle)
router.get("/featured", authMiddleware, postController.featured)
router.get("/up/:username", authMiddleware, postController.findByUser)
router.get("/:id", authMiddleware, postController.findById)
router.patch("/:id", authMiddleware, postController.update)
router.patch("/like/:id", authMiddleware, postController.like)
router.patch("/comment/:id", authMiddleware, postController.addComment)
router.delete("/comment/:postId/:commentId", authMiddleware, postController.deleteComment)
router.delete("/:id", authMiddleware, postController.destroy)

export default router
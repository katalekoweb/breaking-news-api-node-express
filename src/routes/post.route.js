import postController from "../controllers/post.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import {Router} from "express"
const router = Router();

router.get("/", authMiddleware, postController.getAll)
router.post("/", authMiddleware, postController.create)
router.patch("/:id", authMiddleware, postController.update)
router.delete("/:id", authMiddleware, postController.destroy)

export default router
import postController from "../controllers/post.controller.js"
import {Router} from "express"
const router = Router();

router.get("/", postController.getAll)
router.post("/", postController.create)
router.patch("/:id", postController.update)
router.delete("/:id", postController.destroy)

export default router
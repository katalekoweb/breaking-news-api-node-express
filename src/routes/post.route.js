import postController from "../controllers/post.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import {Router} from "express"
import route from "./user.route.js";
const router = Router();

router.get("/", authMiddleware, postController.getAll)
router.post("/", authMiddleware, postController.create)
router.get("/:id", authMiddleware, postController.findById)
router.get("/featured", authMiddleware, postController.featured)
router.patch("/:id", authMiddleware, postController.update)
router.delete("/:id", authMiddleware, postController.destroy)

export default router
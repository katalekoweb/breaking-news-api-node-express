import userController from '../controllers/user.controller.js'
import authMiddleware from "../middlewares/auth.middleware.js"
import { Router } from 'express'
const route = Router()

import { validateId, validateUser } from "../middlewares/global.middlewares.js"

route.post("/", userController.create)
route.get("/", authMiddleware, userController.findAll)
route.get("/:id", authMiddleware, validateId, validateUser, userController.findById)
route.patch("/:id", authMiddleware, validateId, validateUser, userController.update)

// module.exports = route
export default route
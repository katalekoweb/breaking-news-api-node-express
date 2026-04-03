import userController from '../controllers/user.controller.js'
import express from 'express'
const route = express.Router()

import { validateId, validateUser } from "../middlewares/global.middlewares.js"

route.post("/", userController.create)
route.get("/", userController.findAll)
route.get("/:id", validateId, validateUser, userController.findById)
route.patch("/:id", validateId, validateUser, userController.update)

// module.exports = route
export default route
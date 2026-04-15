import { Router } from "express";

import userRoute from './user.route.js'
import authRoute from './auth.route.js'
import postRoute from './post.route.js'
import swaggerRoute from './swagger.route.js'


const router = Router()

router.use("/auth", authRoute)
router.use("/users", userRoute)
router.use("/posts", postRoute)
router.use("/docs", swaggerRoute)

export default router;
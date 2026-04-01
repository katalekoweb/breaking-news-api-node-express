const userController = require('../controllers/user.controller')
const route = require('express').Router()

route.get("/", userController.soma)

module.exports = route
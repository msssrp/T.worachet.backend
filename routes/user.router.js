const express = require("express");
const router = express.Router()
const signUp = require("../middleware/signUp")
const userController = require("../controllers/user.controller")

router.post("/user/register", signUp, userController.registerUser)

router.post("/user/login", userController.loginUser)

router.get('/user/auth', userController.userAuth)



module.exports = router

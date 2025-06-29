const express = require("express")
const {loginUser, signupUser} = require("../controllers/userControllers")
const router = express.Router()

//Login User
router.post("/login", loginUser)

//Sign Up User
router.post("/signup", signupUser)

module.exports = router
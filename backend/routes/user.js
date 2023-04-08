const express = require("express")

const router = express.Router()

const {userLogin, userSignup} = require("../controllers/user")

router.post("/signup", userSignup)
router.post("/login", userLogin)

module.exports = router;
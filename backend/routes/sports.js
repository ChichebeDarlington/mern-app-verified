const express = require("express")
const authentification = require("../middlewares/auth.js")

const {
getAllSports, 
getSingleSport, 
postSport, 
deleteSport, 
updateSport
} = require("../controllers/sports.js")

const router = express.Router()

// authentification for all workout
router.use(authentification)

// Get all sports request
router.get("/", getAllSports)

// Get a single sport request
router.get("/:id", getSingleSport)

// Post a single sport request
router.post("/", postSport)

// Delete a single sport request
router.delete("/:id", deleteSport)

// Update a single sport reques
router.patch("/:id", updateSport)

module.exports = router;
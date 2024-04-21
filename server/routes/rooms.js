const express = require("express");
const router = express.Router();
const {getUserRomms} = require("../controller/roomsController")

router.get("/rooms/:userId", getUserRomms);

module.exports = router;
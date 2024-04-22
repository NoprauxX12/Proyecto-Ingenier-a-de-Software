const express = require("express");
const router = express.Router();
const {getUserRomms, creatEstimate} = require("../controller/roomsController")

router.get("/rooms/:userId", getUserRomms);

router.post("/estimate/create-estimate", creatEstimate);

module.exports = router;
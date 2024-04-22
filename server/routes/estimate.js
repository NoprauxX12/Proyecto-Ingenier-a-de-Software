const express = require("express");

const upload = require("../DAL/multer")


const router = express.Router();

const {getUserEstimates, creatEstimate} = require("../controller/estimateController")

router.post("/rooms", getUserEstimates);

router.post("/create-estimate", upload.single("img"), creatEstimate);

module.exports = router;
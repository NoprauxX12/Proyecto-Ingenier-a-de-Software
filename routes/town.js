const express = require("express");
const townControllers = require("../controllers/townCOntroller")
const router = express.Router();

router.post("/towns", townControllers.fetchCityes);

module.exports= router;
const express = require("express");
const GeneralControllers= require("../controllers/generalControllers");
const adminControllers= require("../controllers/adminControllers")

const router = express.Router();

router.post("/knowledge", GeneralControllers.fetchKnowledge)


router.post("/towns", GeneralControllers.fetchCityes);


router.post("/adm-log-in", adminControllers.AdminlogIn);


router.post("/adm-sign-up", adminControllers.AdminSignUp);


module.exports= router;
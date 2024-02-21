const express= require("express");
const usersControllers = require("../controllers/userControllers")
const router = express.Router();

router.get("/log-in", usersControllers.Login);

router.get("/sign-up", usersControllers.getSignUp);

router.post("/sign-up/freelancer", usersControllers.postSignUp);

module.exports= router;


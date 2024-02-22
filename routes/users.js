const express= require("express");
const usersControllers = require("../controllers/userControllers")
const router = express.Router();

router.post("/sign-up", usersControllers.SignUp);

router.post("/getFreelancers", usersControllers.getFreelancer)

module.exports= router;


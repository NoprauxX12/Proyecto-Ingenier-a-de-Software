const express= require("express");
const usersControllers = require("../controllers/userControllers")
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post("/sign-up", upload.single('photo'), usersControllers.SignUp);

router.post("/getFreelancers", usersControllers.getFreelancer);

router.post("/user_exist", usersControllers.verifyUserExistence);

router.post("/getFreelancerInfo",usersControllers.fetchFreelancerId);

router.post("/log-in", usersControllers.logIn);

router.post("/profile-photo", usersControllers.fetchPhoto);


module.exports= router;


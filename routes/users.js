const express= require("express");
const usersControllers = require("../controllers/userControllers")
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post("/sign-up", usersControllers.SignUp);

router.post("/getFreelancers", usersControllers.getFreelancer);

router.post("/update-users", upload.single('photo'), usersControllers.FinalOfSignUp);

router.post("/user_exist", usersControllers.verifyUserExistence);
module.exports= router;


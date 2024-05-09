const express= require("express");
const usersControllers = require("../controllers/userControllers")
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post("/sign-up", upload.single('photo'), usersControllers.SignUp);

router.post("/getFreelancers", usersControllers.getFreelancer);

router.post("/user_exist", usersControllers.verifyUserExistence);

router.post("/view-profile",usersControllers.viewProfile);

router.post("/edit-profile", upload.single('photo'), usersControllers.editProfile);

router.post("/log-in", usersControllers.logIn);

router.post("/profile-photo", usersControllers.fetchPhoto);

router.post("/freelancer-preferences",usersControllers.progressiveProfiling);

router.post("/check-preferences",usersControllers.checkPreferences);

module.exports= router;


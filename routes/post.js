const express = require("express");
const postControllers = require("../controllers/postControllers");

const router = express.Router();

router.post("/create-post", postControllers.createPost)

module.exports= router;
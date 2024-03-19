const express = require("express");
const postControllers = require("../controllers/postControllers");

const router = express.Router();

router.post("/create-post", postControllers.createPost)

router.post("/get-posts", postControllers.fetchPost);

module.exports= router;
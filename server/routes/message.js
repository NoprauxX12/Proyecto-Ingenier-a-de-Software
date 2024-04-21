const express = require("express");
const {getMessages, createMessage, inserImages} = require("../controller/MessageController");
const router = express.Router();

router.get("/messages/:roomId", getMessages);
  

router.post('/messages', createMessage);


router.post('/photo', inserImages);
  

module.exports = router;
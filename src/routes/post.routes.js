const express = require("express");
const { postsControllers } = require("../controllers/post.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/", authMiddleware, postsControllers);

module.exports = router;

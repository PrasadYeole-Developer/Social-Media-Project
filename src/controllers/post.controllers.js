const Post = require("../models/post.model");
require("dotenv").config();

const postsControllers = async (req, res) => {
  const file = req.file;
  if(!file){
    return res.status(400).json({ message: "Image is required" });
  }
  
};

module.exports = { postsControllers };

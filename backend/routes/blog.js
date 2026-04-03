const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blog');
const upload = require('../middlewares/upload');

router.post("/create-blog", upload.single("images"), createBlog);
router.get("/all-blogs", getBlogs);
router.get("/single-blog/:id", getBlogById);
router.put("/update-blog/:id", upload.single("images"), updateBlog);
router.delete("/delete-blog/:id", deleteBlog);

module.exports = router;
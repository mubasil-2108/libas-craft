const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler');
const fs = require("fs");
const { deleteFileFromDrive, uploadFile } = require('../utils/googleDriveOAuth');

async function uploadWithRetry(filePath, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await uploadFile(filePath, "blogImages");
        } catch (err) {
            console.error(`Upload attempt ${attempt} failed for ${filePath}:`, err.message);
            if (attempt === retries) throw err;
            await new Promise(res => setTimeout(res, attempt * 1000)); // exponential backoff
        }
    }
}

// @desc    Create Blog
// @route   POST /api/blogs
// @access  Admin

const createBlog = asyncHandler(async (req, res) => {
    const { title, content, author } = req.body;

    console.log("Received blog data:", { title, content, author });

    if (!title || !content) {
        res.status(400);
        throw new Error("Title and content are required");
    }

    let image = {};

    if (req.file) {
        const filePath = req.file.path;

        try {
            const fileUrl = await uploadWithRetry(filePath);

            image = {
                id: fileUrl.id,
                name: fileUrl.name,
                webContentLink: fileUrl.webContentLink,
                webViewLink: fileUrl.webViewLink,
            }
            await fs.promises.unlink(filePath);
        } catch (err) {
            console.error("Image upload error:", err);
            return res
                .status(500)
                .json({ message: "Failed to upload blog image" });
        }
    }

    const blog = await Blog.create({
        title,
        content,
        blogImage: image,
        author
    })

    res.status(201).json({
        success: true,
        message: "Blog created successfully",
        data: blog,
    });

});

// @desc    Get all Blogs
// @route   GET /api/blogs
// @access  Public

const getBlogs = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Blog.countDocuments();

    res.status(200).json({
        success: true,
        count: blogs.length,
        total,
        page,
        pages: Math.ceil(total / limit),
        data: blogs,
    });
});

// @desc    Get Blog by ID
// @route   GET /api/blogs/:id
// @access  Public

const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(404);
        throw new Error("Blog not found");
    }

    res.status(200).json({
        success: true,
        data: blog,
    });
});

// @desc    Update Blog
// @route   PUT /api/blogs/:id
// @access  Admin

const updateBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    let image = {};
    if (req.file) {
        const filePath = req.file.path;

        try {
            const existingBlog = await Blog.findById(req.params.id);
            if (existingBlog && existingBlog.blogImage && existingBlog.blogImage.id) {
                await deleteFileFromDrive(existingBlog.blogImage.id);
            }
            const fileUrl = await uploadWithRetry(filePath);

            image = {
                id: fileUrl.id,
                name: fileUrl.name,
                webContentLink: fileUrl.webContentLink,
                webViewLink: fileUrl.webViewLink,
            }
            await fs.promises.unlink(filePath);
        } catch (err) {
            console.error("Image upload error:", err);
            return res
                .status(500)
                .json({ message: "Failed to upload or update blog image" });
        }
    }

    const blog = await Blog.findByIdAndUpdate(
        req.params.id,
        {
            ...(title && { title }),
            ...(content && { content }),
            ...(req.file && { blogImage: image }),
        },
        { new: true, runValidators: true }
    );

    if (!blog) {
        res.status(404);
        throw new Error("Blog not found");
    }

    res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        data: blog,
    });
});

// @desc    Delete Blog
// @route   DELETE /api/blogs/:id
// @access  Admin

const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(404);
        throw new Error("Blog not found");
    }

    if (blog.blogImage && blog.blogImage.id) {
        try {
            await deleteFileFromDrive(blog.blogImage.id);
        } catch (err) {
            console.error("Failed to delete blog image from Google Drive:", err);
        }
    }

    await blog.deleteOne();

    res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
    });
});

module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
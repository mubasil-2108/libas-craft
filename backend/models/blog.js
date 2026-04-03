const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    blogImage: {
        id: { type: String },
        name: { type: String },
        status: { type: String, default: 'uploaded' },
        webContentLink: { type: String },
        webViewLink: { type: String }
    },
    content: {
        type: String, // ✅ HTML from Tiptap
        required: true,
    },
    author: { type: String, default: 'Admin' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', blogSchema);
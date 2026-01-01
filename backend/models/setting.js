const mongoose = require("mongoose");

/* =========================
   REUSABLE FILE SCHEMA
========================= */
const FileSchema = {
    id: { type: String },
    name: { type: String },
    status: { type: String, default: "uploaded" },
    webContentLink: { type: String },
    webViewLink: { type: String },
};

/* =========================
   MAIN SETTING SCHEMA
========================= */
const SettingSchema = new mongoose.Schema(
    {
        site: {
            logo: FileSchema,

            name: {
                type: String,
                trim: true,
                required: [true, "Site name is required"],
            },
            headline: {
                type: String,
                trim: true,
            },
            description: {
                type: String,
                trim: true,
            },

            keywords: {
                type: [String],
                required: [true, "Keywords are required"],
                set: (values) => values.map(v => v.trim().toLowerCase()),
            },

            address: {
                type: String,
                trim: true,
                required: [true, "Address is required"],
            },

            phone: {
                type: String,
                trim: true,
                required: [true, "Phone number is required"],
                match: [/^[0-9+\-\s()]+$/, "Invalid phone number"],
            },

            email: {
                type: String,
                trim: true,
                match: [
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "Please enter a valid email",
                ],
            },
        },

        modal: {
            image: FileSchema,

            headline: {
                type: String,
                trim: true,
            },

            description: {
                type: String,
                trim: true,
            },
        },

        social: {
            whatsapp: { type: String, trim: true },
            facebook: { type: String, trim: true },
            snapchat: { type: String, trim: true },
            tiktok: { type: String, trim: true },
            instagram: { type: String, trim: true },
        },

        note: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Setting", SettingSchema);

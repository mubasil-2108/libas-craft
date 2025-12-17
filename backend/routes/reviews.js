const express = require("express");
const { createReview, deleteReview, getAllReviews, getReviewById, getReviewsByProduct } = require("../controllers/reviews");
const router = express.Router();
const upload = require("../middlewares/upload");


// Routes

router.post("/create-review", upload.array('images', 5), createReview);
router.get("/all-reviews", getAllReviews);
router.get("/product/:productId", getReviewsByProduct);
router.get("/:id", getReviewById);
router.delete("/delete/:id", deleteReview);

module.exports = router;
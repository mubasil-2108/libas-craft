const express = require("express");
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, searchProducts } = require("../controllers/product");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/create-product", upload.array("productPhoto", 7), createProduct);
router.get("/all-products", getAllProducts);
router.get("/single-product/:id", getProductById);
router.put("/update-product/:id", upload.array("productPhoto", 7), updateProduct);
router.delete("/delete-product/:id", deleteProduct);
router.get("/search", searchProducts);

module.exports = router;
const express = require("express");
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, setMainProduct, getProductsByCategory, searchProducts, deleteProductImage } = require("../controllers/product");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/create-product", upload.array("images", 5), createProduct);
router.get("/all-products", getAllProducts);
router.get("/single-product/:id", getProductById);
router.get("/category/:category", getProductsByCategory);
router.put("/main-product/:id", setMainProduct);
router.put("/update-product/:id", upload.array("images", 5), updateProduct);
router.delete("/delete-product/:id", deleteProduct);
router.get("/search", searchProducts);
router.delete("/delete-product-image/:id", deleteProductImage);

module.exports = router;
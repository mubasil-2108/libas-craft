const express = require("express");
const { createSpecialPackage, getAllSpecialPackages, getSpecialPackage, updateSpecialPackage, deleteSpecialPackage } = require("../controllers/specialPackage");
const upload = require("../middlewares/upload");

const router = express.Router();


router.post("/create-package", upload.single("packageImage"), createSpecialPackage);
router.get("/all-packages", getAllSpecialPackages);
router.get("/single-package/:id", getSpecialPackage);
router.put("/update-package/:id", upload.single("packageImage"), updateSpecialPackage);
router.delete("/delete-package/:id", deleteSpecialPackage);

module.exports = router;

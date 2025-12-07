const express = require("express");
const { createSpecialPackage, getAllSpecialPackages, setMainPackage, deletePackageImage, getSpecialPackage, updateSpecialPackage, deleteSpecialPackage } = require("../controllers/specialPackage");
const upload = require("../middlewares/upload");

const router = express.Router();


router.post("/create-package", upload.single("images"), createSpecialPackage);
router.get("/all-packages", getAllSpecialPackages);
router.get("/single-package/:id", getSpecialPackage);
router.put("/main-package/:id", setMainPackage);
router.put("/update-package/:id", upload.single("images"), updateSpecialPackage);
router.delete("/delete-package/:id", deleteSpecialPackage);
router.delete("/delete-package-image/:id", deletePackageImage);

module.exports = router;

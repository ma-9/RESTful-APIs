// ============= Importing Dependencies ==============
const router = require("express").Router();
const { todaysDate } = require("../../config/config");
const checkAuth = require("../middleware/check-auth");

const productController = require("../controllers/product");

// ====== File Upload Using Multer ======================
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      todaysDate + " " + new Date().getSeconds() + " " + file.originalname
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        " Invalid File Type : Please Upload only JPEG,JPG or PNG files "
      ),
      false
    );
  }
};

var upload = multer({
  fileFilter: fileFilter,
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }
});

// ================= Handling Requests =============
router.get("/", productController.getAllProducts);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  productController.postNewProduct
);

router.get("/:ProductID", productController.getParticularProduct);

router.patch("/:ProductID", checkAuth, productController.patchProduct);

router.delete("/:ProductID", checkAuth, productController.deleteProduct);

// ================ Exporting Router =====================
module.exports = router;

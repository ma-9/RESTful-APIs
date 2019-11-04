// ============= Importing Dependencies ==============
const router = require("express").Router();
const checkAuth = require("../middleware/check-auth");

// ============ Importing User Models ======================
const Users = require("../models/user");

const userController = require('../controllers/user');

router.get("/", userController.getAllUsers);

router.post("/signup", userController.postNewUser);

router.post("/login", userController.postLogin);

router.get("/:userID", userController.getParticularUser);

router.delete("/:userID", checkAuth, userController.deleteUser);

router.patch("/:userID", checkAuth, userController.patchUser);

// ================ Exporting Router =====================
module.exports = router;

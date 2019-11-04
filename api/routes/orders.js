// ================ Importing Dependencies ===================
const router = require("express").Router();
const checkAuth = require('../middleware/check-auth');

// =================== Importing Controllers =================
const orderController = require('../controllers/order');


// ============ Handling Requestes =============
router.get("/", checkAuth, orderController.getAllOrders);
router.post("/", checkAuth, orderController.postNewOrder);
router.get("/:orderID", checkAuth, orderController.getParticularOrder);
router.delete("/:orderID", checkAuth, orderController.deleteParticularOrder);

// ============= exporting All Routes ==========================
module.exports = router;

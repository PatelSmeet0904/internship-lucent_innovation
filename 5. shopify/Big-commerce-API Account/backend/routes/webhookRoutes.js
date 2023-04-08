const express = require("express");

const {
  createOrder,
  updateOrder,
  archiveOrder,
} = require("../controllers/webhookController");

const router = express.Router();

router.route("/createOrder").post(createOrder);
router.route("/updateOrder").post(updateOrder);
router.route("/archiveOrder").post(archiveOrder);

module.exports = router;

const express = require("express");
const {
  auth_callback,
  uninstall,
  load,
} = require("../controllers/shopController");
const { protectUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/oauth").get(auth_callback);
router.route("/load").get(protectUser, load);
router.route("/uninstall").get(protectUser, uninstall);

module.exports = router;

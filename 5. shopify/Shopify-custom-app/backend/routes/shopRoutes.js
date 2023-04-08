const express = require("express");
const { loginShop, redirect_url } = require("../controllers/shopController");

const router = express.Router();

router.post("/login", loginShop);
router.get("/redirect", redirect_url);

module.exports = router;

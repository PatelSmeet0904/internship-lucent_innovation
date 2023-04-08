const express = require("express");
const {addProductController} = require("../controllers/Products/Products.js");
const checkoutStripeController = require("../controllers/Stripe/Stripe.js");
const router = express.Router();

router.post("/product/create", addProductController);
router.post("/product/checkout", checkoutStripeController);



module.exports = router;
const express = require("express");

const {
  getCustomers,
  deleteCustomer,
  updateCustomer,
  createCustomer,
  getCustomerById,
} = require("../controllers/customerControllers.js");

const { protectUser } = require("../middleware/authMiddleware.js");

const router = express.Router();

router
  .route("/")
  .get(protectUser, getCustomers)
  .post(protectUser, createCustomer);

router
  .route("/:id")
  .get(protectUser, getCustomerById)
  .delete(protectUser, deleteCustomer)
  .put(protectUser, updateCustomer);

module.exports = router;

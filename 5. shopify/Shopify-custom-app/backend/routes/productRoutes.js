const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  getProductById,
} = require("../controllers/productController.js");
const { protectUser } = require("../middleware/authMiddleware.js");

router
  .route("/")
  .get(protectUser, getAllProduct)
  .post(protectUser, createProduct);

router
  .route("/:id")
  .get(protectUser, getProductById)
  .delete(protectUser, deleteProduct)
  .put(protectUser, updateProduct);

module.exports = router;

const axios = require("axios");
const Shopify = require("shopify-api-node");
const {
  createOrUpdateProductDatabase,
} = require("../helper/CreateOrUpdateProductDatabase.js");
const db = require("../config/db.js");
const Product = db.products;
const Variant = db.product_variants;
const Image = db.product_images;
const Op = db.Sequelize.Op;

// @desc    Create Product
// @route   POST /api/product/
// @access  Private/Admin
const createProduct = async (req, res) => {
  const { domain, accessToken, shopId } = req.shop.dataValues;

  const shopify = new Shopify({
    shopName: domain,
    accessToken: accessToken,
  });
  console.log(shopId);
  try {
    const product = await shopify.product.create(req.body);
    const productList = [product];
    createOrUpdateProductDatabase(productList, shopId);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ Message: error });
    console.log(error);
  }
};

// @desc    Get Product
// @route   GET /api/product/:id
// @access  Private/Admin
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByPk(productId, {
      include: [{ model: Variant }, { model: Image }],
    });

    res.json(product);
  } catch (error) {
    res.status(400).json({ Message: error });
    console.log(error);
  }
};

// @desc    Get All Product
// @route   GET /api/product/
// @access  Private/Admin
const getAllProduct = async (req, res) => {
  try {
    const { pageNumber, keyword } = req.query;
    const pageSize = 10;
    const page = Number(pageNumber) || 1;
    var condition = keyword
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${keyword}%` } },
            { product_type: { [Op.like]: `%${keyword}%` } },
          ],
        }
      : null;
    const { count } = await Product.findAndCountAll({
      where: condition,
    });
    const data = await Product.findAll({
      where: condition,
      include: [{ model: Variant }, { model: Image }],
      offset: pageSize * (page - 1),
      limit: pageSize,
    });
    res.status(200).json({ count, data });
  } catch (error) {
    res.status(400).json({ Message: error });
    console.log(error);
  }
};

// @desc    Update Product
// @route   PUT /api/product/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { domain, accessToken, shopId } = req.shop.dataValues;
  const productId = req.params.id;

  const shopify = new Shopify({
    shopName: domain,
    accessToken: accessToken,
  });

  try {
    const updateProduct = await shopify.product.update(productId, req.body);
    console.log(updateProduct);
    const productList = [updateProduct];
    createOrUpdateProductDatabase(productList, shopId);
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(400).json({ Message: error });
    console.log(error);
  }
};

// @desc    Delete Product
// @route   DELETE /api/product/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  const { domain, accessToken } = req.shop.dataValues;
  const productId = req.params.id;

  const shopify = new Shopify({
    shopName: domain,
    accessToken: accessToken,
  });

  try {
    await shopify.product.delete(productId);
    await Product.destroy({
      where: {
        id: productId,
      },
      include: [{ model: Variant }, { model: Image }],
    });
    res.status(200).json({ Message: "Success!!" });
  } catch (error) {
    res.status(400).json({ Message: error });
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getProductById,
  getAllProduct,
  updateProduct,
  deleteProduct,
};

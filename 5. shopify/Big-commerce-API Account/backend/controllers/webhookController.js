const axios = require("axios");
const db = require("../config/db.js");
const Shop = db.shops;
const { createOrUpdateOrder } = require("../helper/CreateOrUpdateOrder.js");

// @desc    Create Order Webhook
// @route   POST /webhook/createOrder
// @access  Private
const createOrder = async (req, res) => {
  const eventData = req.body;
  console.log(eventData);

  try {
    const orderId = eventData.data.id;
    const storeId = eventData.store_id;

    const shop = await Shop.findOne({ where: { store_id: storeId } });
    const accessToken = shop.token;

    const orderLineItemsUrl = `${process.env.API_PATH}/v2/orders/${orderId}/products`;
    const response = await axios.get(orderLineItemsUrl, {
      headers: {
        "X-Auth-Token": accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const orderLineItemsData = response.data;

    for (const product of orderLineItemsData) {
      if (product.product_id === shop.product_id) {
        const variant = await Variant.findOne({
          where: { variant_id: product.variant_id },
        });
        await createOrUpdateOrder(shop, orderId, orderLineItemsData, variant);
      }
    }
    // await createOrUpdateOrder(shop, orderId, orderLineItemsData);

    res.json({ Message: "Success!!" });
  } catch (error) {
    console.log(error.message);
  }
};

// @desc    Update Order Webhook
// @route   POST /webhook/updateOrder
// @access  Private
const updateOrder = async (req, res) => {
  const eventData = req.body;
  console.log(eventData);

  try {
    const orderId = eventData.data.id;
    const storeId = eventData.store_id;

    const shop = await Shop.findOne({ where: { store_id: storeId } });
    const accessToken = shop.token;

    const orderLineItemsUrl = `${process.env.API_PATH}/v2/orders/${orderId}/products`;
    const response = await axios.get(orderLineItemsUrl, {
      headers: {
        "X-Auth-Token": accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const orderLineItemsData = response.data;

    // for (const product of orderLineItemsData) {
    //   if (product.product_id === shop.product_id) {
    //  const variant = await Variant.findOne({
    //    where: { variant_id: product.variant_id },
    //  });
    //     // // Store the order data in your database using Sequelize
    //     await createOrUpdateOrder(shop, orderId, orderLineItemsData, variant);
    //   }
    // }

    await createOrUpdateOrder(shop, orderId, orderLineItemsData);

    res.json({ Message: "Success!!" });
  } catch (error) {
    console.log(error.message);
  }
};

// @desc    Delete Order Webhook
// @route   POST /webhook/archiveOrder
// @access  Private
const archiveOrder = async (req, res) => {
  const eventData = req.body;
  console.log(eventData);

  try {
    const orderId = eventData.data.id;
    const storeId = eventData.store_id;

    // // Store the order data in your database using Sequelize
    await createOrUpdateOrder(storeId, orderId);

    res.json({ Message: "Success!!" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createOrder,
  updateOrder,
  archiveOrder,
};

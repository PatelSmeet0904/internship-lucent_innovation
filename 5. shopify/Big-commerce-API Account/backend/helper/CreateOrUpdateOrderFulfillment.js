const axios = require("axios");
const { Op } = require("sequelize");
const db = require("../config/db.js");
const OrderFulfillment = db.order_fulfillments;

const CreateOrUpdateOrderFulfillment = async (shop, orderData) => {
  console.log("ful id", orderData.id);
  try {
    const [ordeAddress, created] = await OrderFulfillment.upsert(
      {
        store_id: shop.id,
        shopify_order_id: orderData.id,
        fulfilment_id: orderData.status_id,
        fulfilment_status: orderData.status,
        fulfilment_name: orderData.status, //what it is?
        fulfilment_created_at: Date.now(),
        fulfilment_updated_at: Date.now(),
        location_id: "Not",
        is_refund: orderData.is_refunded,
        updated_at: Date.now(),
      },
      {
        where: {
          [Op.and]: [
            { store_id: shop.id },
            { shopify_order_id: orderData.id },
            { fulfilment_id: orderData.status_id },
          ],
        },
      }
    );
    console.log("fulfillment", created);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { CreateOrUpdateOrderFulfillment };

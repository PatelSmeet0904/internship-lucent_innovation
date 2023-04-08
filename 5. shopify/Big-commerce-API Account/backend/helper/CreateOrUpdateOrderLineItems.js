const axios = require("axios");
const { Op } = require("sequelize");
const db = require("../config/db.js");
const OrderLineItem = db.order_lineitems;

const createOrUpdateOrderLineItems = async (shop, orderLineItemsData) => {
  console.log("items len", orderLineItemsData.length);
  for (const item of orderLineItemsData) {
    // console.log(item.quantity_shipped);
    if (item.quantity_shipped !== 0) {
      const [ordeitem, created] = await OrderLineItem.upsert(
        {
          store_id: shop.id,
          shopify_order_id: item.order_id,
          line_item_id: item.id,
          fulfillment_id: "3",
          title: item.name,
          price: item.price_inc_tax,
          quantity: item.quantity,
          variant_id: item.variant_id,
          product_id: item.product_id,
          updated_at: Date.now(),
        },
        { where: { line_item_id: item.id } }
      );
      console.log("item", created);
    }
  }
};

module.exports = { createOrUpdateOrderLineItems };

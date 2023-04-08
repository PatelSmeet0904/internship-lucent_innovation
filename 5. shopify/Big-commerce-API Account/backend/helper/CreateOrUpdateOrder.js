const axios = require("axios");
const db = require("../config/db.js");
const {
  createOrUpdateOrderAddress,
} = require("./CreateOrUpdateOrderAddress.js");
const {
  CreateOrUpdateOrderFulfillment,
} = require("./CreateOrUpdateOrderFulfillment.js");
const {
  createOrUpdateOrderLineItems,
} = require("./CreateOrUpdateOrderLineItems.js");
const Order = db.orders;

const createOrUpdateOrder = async (
  shop,
  orderId,
  orderLineItemsData,
  variant
) => {
  try {
    // Retrieve the access token for the store from your database
    const accessToken = shop.token;
    console.log("1", accessToken, orderId);

    // Use the BigCommerce API to fetch information about the new order
    const orderUrl = `${process.env.API_PATH}/v2/orders/${orderId}`;
    const response = await axios.get(orderUrl, {
      headers: {
        "X-Auth-Token": accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const orderData = response.data;
    const [order, created] = await Order.upsert(
      {
        store_id: shop.id,
        shopify_order_id: orderData.id,
        order_number: "NOT GIVEN",
        order_name: "NOT GIVEN",
        order_amount: orderData.total_inc_tax,
        order_created_at: orderData.date_created,
        order_updated_at: orderData.date_modified,
        email: orderData.billing_address.email,
        phone_number: orderData.billing_address.phone,
        customer_id: orderData.customer_id,
        customer_name: "NOT GIVENs AND REQUIRED",
        fulfillment_status: orderData.status,
        has_claim_request: "NO",
        discount_amount: orderData.discount_amount,
        // insurance_plan: variant.variant_name,
        // insurance_plan_id: variant.variant_id,
        // insurance_plan_amount: variant.amount,
        insurance_plan: "NOT GIVEN",
        insurance_plan_id: 1,
        insurance_plan_amount: "0",
        updated_at: Date.now(),
      },
      {
        where: { shopify_order_id: orderData.id },
      }
    );
    console.log("order", created);

    await createOrUpdateOrderAddress(shop, orderId, orderData.billing_address);
    await CreateOrUpdateOrderFulfillment(shop, orderData);

    if (orderData.items_shipped !== 0) {
      await createOrUpdateOrderLineItems(shop, orderLineItemsData);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createOrUpdateOrder };

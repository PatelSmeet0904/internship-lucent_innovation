const axios = require("axios");
const { Op } = require("sequelize");
const db = require("../config/db.js");
const OrderAddress = db.order_addresses;

const createOrUpdateOrderAddress = async (shop, orderId, billing_address) => {
  const accessToken = shop.token;

  const [ordeAddress, created] = await OrderAddress.upsert(
    {
      store_id: shop.id,
      shopify_order_id: orderId,
      first_name: billing_address.first_name,
      last_name: billing_address.last_name,
      address1: billing_address.street_1,
      address2: billing_address.street_2,
      phone: billing_address.phone,
      city: billing_address.city,
      zip: billing_address.zip,
      country: billing_address.country,
      country_code: billing_address.country_iso2,
      is_billing_address: true,
      updated_at: Date.now(),
    },
    {
      where: {
        [Op.and]: [{ shopify_order_id: orderId }, { is_billing_address: true }],
      },
    }
  );
  console.log("bill address", created);

  const orderShippingUrl = `${process.env.API_PATH}/v2/orders/${orderId}/shipping_addresses`;
  const response = await axios.get(orderShippingUrl, {
    headers: {
      "X-Auth-Token": accessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const orderAddressData = response.data;
  console.log("addresses len", orderAddressData.length);
  for (const address of orderAddressData) {
    const [ordeAddress, created] = await OrderAddress.upsert(
      {
        store_id: shop.id,
        shopify_order_id: address.order_id,
        first_name: address.first_name,
        last_name: address.last_name,
        address1: address.street_1,
        address2: address.street_2,
        phone: address.phone,
        city: address.city,
        zip: address.zip,
        country: address.country,
        country_code: address.country_iso2,
        updated_at: Date.now(),
      },
      {
        where: {
          [Op.and]: [
            { shopify_order_id: orderId },
            { is_billing_address: false },
          ],
        },
      }
    );
    break;
  }
};

module.exports = { createOrUpdateOrderAddress };

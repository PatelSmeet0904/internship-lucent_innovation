const db = require("../config/db.js");
const Customer = db.customers;
const Address = db.customer_addresses;

const createOrUpdateCustomerDatabase = async (data, shopId) => {
  for (let customer of data) {
    const [dbcustomer, created] = await Customer.upsert({
      id: customer.id,
      fname: customer.first_name,
      lname: customer.last_name,
      phone: customer.phone,
      email: customer.email,
      shopId: shopId,
    });

    // loop through each address of the customer and insert/update it in the address table
    for (let address of customer.addresses) {
      const [a, c] = await Address.upsert({
        id: address.id,
        customer_id: address.customer_id,
        address1: address.address1,
        address2: address.address2,
        country: address.country,
        zip: address.zip,
        default: address.default,
        shopId: shopId,
      });
    }
  }
};

module.exports = { createOrUpdateCustomerDatabase };

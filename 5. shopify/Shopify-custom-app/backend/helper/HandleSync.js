const {
  createOrUpdateCustomerDatabase,
} = require("./CreateOrUpdateCustomerDatabase");
const {
  createOrUpdateProductDatabase,
} = require("./CreateOrUpdateProductDatabase");
const Shopify = require("shopify-api-node");

const HandleSyncProduct = async (data) => {
  try {
    const { domain, accessToken, shopId } = data;

    const shopify = new Shopify({
      shopName: domain,
      accessToken: accessToken,
    });

    let allProducts = [];
    let params = { limit: 40 };

    do {
      const products = await shopify.product.list(params);
      allProducts = [...allProducts, ...products];
      params = products.nextPageParameters;
    } while (params !== undefined);

    createOrUpdateProductDatabase(allProducts, shopId);
  } catch (error) {
    console.log(error);
  }
};

const HandleSyncCustomer = async (data) => {
  try {
    const { domain, accessToken, shopId } = data;

    const shopify = new Shopify({
      shopName: domain,
      accessToken: accessToken,
    });

    let allCustomers = [];
    let params = { limit: 1 };

    do {
      const customers = await shopify.customer.list(params);
      allCustomers = [...allCustomers, ...customers];
      params = customers.nextPageParameters;
    } while (params !== undefined);

    createOrUpdateCustomerDatabase(allCustomers, shopId);
  } catch (error) {
    console.log("Failed to load customer!!!");
  }
};

module.exports = { HandleSyncCustomer, HandleSyncProduct };

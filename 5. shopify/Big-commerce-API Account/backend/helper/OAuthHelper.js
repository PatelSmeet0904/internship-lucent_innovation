const BigCommerce = require("node-bigcommerce");

const authorize = async (query) => {
  try {
    const bigCommerce = new BigCommerce({
      clientId: `${process.env.CLIENT_ID}`,
      secret: `${process.env.CLIENT_SECRET}`,
      callback: `${process.env.redirect_uri}`,
      responseType: "json",
    });
    const response = await bigCommerce.authorize(query);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { authorize };

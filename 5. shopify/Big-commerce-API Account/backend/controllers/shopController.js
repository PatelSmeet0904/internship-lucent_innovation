const { authorize } = require("../helper/OAuthHelper");
const path = require("path");
const BigCommerce = require("node-bigcommerce");
const db = require("../config/db.js");
const { subscribeWebhook } = require("../helper/webhookSubscribe");
const Shop = db.shops;

// @desc    Redirect to App
// @route   GET /bigcommerce/oauth
// @access  Private
const auth_callback = async (req, res) => {
  const { context, scope, code } = req.query;
  console.log("auth");

  try {
    const appData = await authorize(req.query);

    if (appData) {
      const bigCommerce = new BigCommerce({
        clientId: `${process.env.CLIENT_ID}`,
        secret: `${process.env.CLIENT_SECRET}`,
        accessToken: appData.access_token,
        storeHash: context.split("/")[1],
        responseType: "json",
      });
      const data = await bigCommerce.get("/store");

      const [dbShop, created] = await Shop.upsert(
        {
          store_id: data.store_id,
          token: appData.access_token,
          access_scopes: appData.scope,
          storename: data.name,
          username: data.id,
          email: data.admin_email,
          guid: data.account_uuid,
          myshopify_domain: data.domain,
          iana_timezone: data.timezone.name,
          currency_format: data.currency_symbol,
          country_name: data.country,
          country_code: data.country_code,
        },
        {
          where: { store_id: data.store_id },
        }
      );
      console.log("yes", created);
      await subscribeWebhook(appData.access_token);
      return res.json({ type: "oauth", data: appData });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json({ Message: error.message });
  }
};

// @desc    Redirect to App
// @route   GET /bigcommerce/load
// @access  Private
const load = async (req, res) => {
  try {
    // await subscribeWebhook(req.shop.token);
    const filename = path.join(
      __dirname,
      "..",
      "..",
      "frontend",
      "dist",
      "index.html"
    );
    console.log(filename);
    return res.sendFile(filename);
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
};

// @desc    Redirect to App
// @route   GET /bigcommerce/uninstall
// @access  Private
const uninstall = async (req, res) => {
  console.log("uninstall");

  try {
    await Shop.destroy({
      where: {
        id: req.shop.id,
      },
    });
    return res.json({ Message: "Uninstall" });
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
};

module.exports = { auth_callback, load, uninstall };

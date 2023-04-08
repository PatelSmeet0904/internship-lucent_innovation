const { redirectURL, authorize } = require("../helper/OAuthHelper");
const crypto = require("crypto");
const { generateToken } = require("../middleware/authMiddleware");
const {
  HandleSyncCustomer,
  HandleSyncProduct,
} = require("../helper/HandleSync");
const db = require("../config/db.js");
const Shop = db.shops;
const Shopify = require("shopify-api-node");

const calculatedHmac = (data) => {
  const message = Object.keys(data)
    .filter((key) => key !== "hmac")
    .map((key) => `${key}=${data[key]}`)
    .sort()
    .join("&");

  const calculated_hmac = crypto
    .createHmac("sha256", process.env.CLIENT_SECRET)
    .update(message)
    .digest("hex");

  return calculated_hmac;
};

// @desc    Redirect to App
// @route   POST /api/shop/redirect
// @access  Public
const redirect_url = async (req, res) => {
  const { shop, hmac, code } = req.query;
  console.log("hi redirect");

  const calHmac = calculatedHmac(req.query);

  if (calHmac !== hmac) {
    res.status(400).json({ Message: "Invalid Reuest" });
    return;
  } else {
    const appData = await redirectURL(code, shop);
    try {
      const shopify = new Shopify({
        shopName: shop,
        accessToken: appData.access_token,
      });

      const shopData = await shopify.shop.get({});

      const formData = {
        shopId: shopData.id,
        shopName: shopData.name,
        email: shopData.email,
        domain: shopData.domain,
        accessToken: appData.access_token,
        scope: appData.scope,
      };

      const existShopData = await Shop.findOne({
        where: { shopId: formData.shopId },
      });

      if (existShopData) {
        await Shop.update(formData, {
          where: { shopId: existShopData.shopId },
        });

        const sessionData = {
          token: generateToken(existShopData.id),
          shopName: formData.shopName,
        };
        HandleSyncCustomer(formData);
        HandleSyncProduct(formData);
        res.redirect(
          `http://localhost:3000/admin/dashboard?sessionData=${JSON.stringify(
            sessionData
          )}`
        );
      } else {
        const newData = await Shop.create(formData);
        const sessionData = {
          token: generateToken(newData.dataValues.id),
          shopName: newData.dataValues.shopName,
        };
        HandleSyncCustomer(newData.dataValues);
        HandleSyncProduct(newData.dataValues);
        res.redirect(
          `http://localhost:3000/admin/dashboard?sessionData=${JSON.stringify(
            sessionData
          )}`
        );
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
};

// @desc    Auth shop & get token
// @route   GET /api/shop/login
// @access  Public
const loginShop = async (req, res) => {
  try {
    const shopName = req.body.shopname;
    const i = await authorize(shopName);
    console.log("auth url", i);
    return res.redirect(i);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { redirect_url, loginShop };

const BigCommerce = require("node-bigcommerce");
const db = require("../config/db.js");
const Shop = db.shops;
const jwt = require("jsonwebtoken");

const protectUser = async (req, res, next) => {
  console.log();
  if (req.query.signed_payload) {
    const { signed_payload, signed_payload_jwt } = req.query;
    console.log(req.query);
    console.log("load");

    const bigCommerce = new BigCommerce({
      secret: `${process.env.CLIENT_SECRET}`,
      responseType: "json",
    });

    try {
      const data = bigCommerce.verify(signed_payload);
      const jwtVerify = jwt.verify(
        signed_payload_jwt,
        process.env.CLIENT_SECRET
      );
      // console.log(data);
      console.log("jwt", jwtVerify);
      req.shop = await Shop.findOne({
        where: { username: data.store_hash },
      });
      next();
    } catch (err) {
      res.status(401).json({ Message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ Message: "Not authorized, no token" });
  }
};

module.exports = {
  protectUser,
};

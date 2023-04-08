const jwt = require("jsonwebtoken");
const db = require("../config/db.js");
const Shop = db.shops;

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
};

const protectUser = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      console.log(decoded.id);
      req.shop = await Shop.findOne({
        where: { id: decoded.id },
      });
      next();
    } catch (error) {
      res.status(401).json({ Message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ Message: "Not authorized, no token" });
  }
};

module.exports = {
  generateToken,
  protectUser,
};

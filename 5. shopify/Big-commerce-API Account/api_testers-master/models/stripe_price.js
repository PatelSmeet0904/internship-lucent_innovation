const { DataTypes } = require("sequelize");
const sequelize = require("../db/index.js");
const StripeProducts = require("./stripe_products.js");

const StripePrice = sequelize.define(
  "StripePrice",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    price: {
      type: DataTypes.DOUBLE(11, 2),
      allowNull: true,
    },
    stripe_price_id: {
      type: DataTypes.STRING(155),
      allowNull: true,
    },
    stripe_product_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    is_use_charge: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "stripe_prices",
    timestamps: false,
  }
);
StripePrice.belongsTo(StripeProducts, {
  foreignKey: "stripe_product_id",
  onDelete: "CASCADE",
});

StripePrice.sync()
.then(() => {
  console.log("StripePrice connected");
})
.catch((e) => {
  console.log(e);
});

module.exports = StripePrice;

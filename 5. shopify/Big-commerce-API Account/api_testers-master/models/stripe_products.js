const { DataTypes } = require("sequelize");
const sequelize = require("../db/index.js");
const Store = require("./store_schema.js");

const StripeProducts = sequelize.define(
  "StripeProducts",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    stripeProductId: {
      type: DataTypes.STRING(155),
      field: "stripe_product_id",
      allowNull: true,
    },
    stripeProductName: {
      type: DataTypes.STRING(155),
      field: "stripe_product_name",
      allowNull: true,
    },
    pricingPlanId: {
      type: DataTypes.BIGINT,
      field: "pricing_plan_id",
      allowNull: true,
    },
  },
  {
    tableName: "stripe_products",
    timestamps: true,
    underscored: true,
  }
);
// StripeProducts.belongsTo(PricingPlan, {
//     foreignKey: "pricingPlanId",
//     onDelete: "CASCADE",
//   });
StripeProducts.sync()
.then(() => {
  console.log("StripeProducts connected");
})
.catch((e) => {
  console.log(e);
});


module.exports = StripeProducts;

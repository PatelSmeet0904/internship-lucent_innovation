const { DataTypes } = require("sequelize");
const sequelize = require("../db/index.js");
const Store = require("./store_schema.js");

const StripeSchema = sequelize.define(
  "StripeSchema",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    payment_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price_plan_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_amount: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    payment_status: {
      type: DataTypes.STRING
    },
    subscription_id:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    customer_id:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    invoice:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    store_id:{
      type: DataTypes.STRING,
      allowNull: true
    }
  }
);
StripeSchema.belongsTo(Store, {
  foreignKey: "store_id",
  onDelete: "CASCADE",
});

StripeSchema.sync()
.then(() => {
  console.log("StripePrice connected");
})
.catch((e) => {
  console.log(e);
});

module.exports = StripeSchema;

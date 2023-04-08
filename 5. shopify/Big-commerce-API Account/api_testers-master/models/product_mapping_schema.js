const DataTypes = require("sequelize");
const sequelize = require("../db/index.js");

const Insurance_Product_Mapping = sequelize.define(
  "insurance_product_mapping",
  {
    insurance_type_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    product_id: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    product_handle: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    store_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["store_id", "product_id", "insurance_type_id"],
      },
      {
        fields: ["store_id"],
      },
    ],
  }
);

Insurance_Product_Mapping.sync()
  .then(() => {
    console.log("Insurance_Product_Mapping connected");
  })
  .catch((e) => {
    console.log(e);
  });

  module.exports = Insurance_Product_Mapping;

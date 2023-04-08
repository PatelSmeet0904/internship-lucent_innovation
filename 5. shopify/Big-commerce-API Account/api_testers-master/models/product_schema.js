const DataTypes = require("sequelize");
const sequelize = require("../db/index.js");

const Products = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  vendor: {
    type: DataTypes.STRING,
  },
  is_visible: {
    type: DataTypes.BOOLEAN,
  },
  sku: {
    type: DataTypes.STRING,
  },
  inventory_management: {
    type: DataTypes.STRING,
  },
});

Products.sync()
  .then(() => {
    console.log("Products connected");
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = Products;

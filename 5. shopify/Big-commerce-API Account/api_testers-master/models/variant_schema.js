const DataTypes = require("sequelize");
const sequelize = require("../db/index.js");
const Products = require("./product_schema.js");
const Store = require("./store_schema.js");
const Insurance_Plans = require("./insurance_plans_schema.js");

const Variants = sequelize.define(
  "variant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    store_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    variant_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    variant_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    sku: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    insurance_plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["store_id", "variant_id", "insurance_plan_id"],
      },
      {
        fields: ["store_id"],
      },
      {
        fields: ["insurance_plan_id"],
      },
    ],
  }
);

Variants.belongsTo(Store, {
  foreignKey: "store_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Variants.belongsTo(Insurance_Plans, {
  foreignKey: "insurance_plan_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Variants.sync()
  .then(() => {
    console.log("Variants connected");
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = Variants;

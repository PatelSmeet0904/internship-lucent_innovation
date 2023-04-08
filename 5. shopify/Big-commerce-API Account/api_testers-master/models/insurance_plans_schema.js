const DataTypes = require("sequelize");
const sequelize = require("../db/index.js");

const Store = require("./store_schema.js");

const Insurance_Plans = sequelize.define("insurance_plan", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  store_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  insurance_plan_name: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  insurance_plan_amount: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  min_order_price: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  max_order_price: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  product_ids: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  product_tags: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_gloabal_rule: {
    type: DataTypes.ENUM("Yes", "No"),
    allowNull: false,
    defaultValue: "Yes",
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM("Active", "Inactive"),
    allowNull: false,
  },
  can_apply_after_days: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  insurance_plan_type_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Insurance_Plans.belongsTo(Store, {
  foreignKey: "store_id",
  onDelete: "CASCADE",
});

Insurance_Plans.sync()
  .then(() => {
    console.log("insurance_plan created");
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = Insurance_Plans;

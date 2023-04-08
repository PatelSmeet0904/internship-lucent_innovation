const DataTypes = require("sequelize");
const sequelize = require("../db/index.js");

const Store = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    store_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    storename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    myshopify_domain: {
      type: DataTypes.STRING,
    },
    shop_created_at: {
      type: DataTypes.STRING,
    },
    shop_owner: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
    iana_timezone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shopify_plan_name: {
      type: DataTypes.STRING(30),
    },
    plan_name: {
      type: DataTypes.STRING(100),
    },
    plan_id: {
      type: DataTypes.INTEGER,
    },
    // pricing_plan:{
    //   type:DataTypes.STRING,
    //   defaultValue:null
    // },
    plan_discount: {
      type: DataTypes.STRING(50),
    },
    is_paid: {
      type: DataTypes.DataTypes.ENUM("0", "1"),
      defaultValue: "0",
      allowNull: false,
    },
    status: {
      type: DataTypes.DataTypes.ENUM("0", "1"),
      defaultValue: "0",
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.DataTypes.ENUM("0", "1"),
      defaultValue: "0",
      allowNull: false,
    },
    access_scopes: {
      type: DataTypes.STRING,
    },
    is_shop_install: {
      type: DataTypes.DataTypes.ENUM("0", "1"),
      defaultValue: "0",
    },
    currency: {
      type: DataTypes.STRING(10),
    },
    country_code: {
      type: DataTypes.STRING(10),
    },
    currency_format: {
      type: DataTypes.STRING(50) + " CHARSET utf8 COLLATE utf8_general_ci",
      allowNull: false,
    },
    country_name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    location_id: {
      type: DataTypes.STRING(50),
    },
    product_id: {
      type: DataTypes.STRING(50),
    },
    product_name: {
      type: DataTypes.STRING(500),
    },
    product_Image: {
      type: DataTypes.STRING(500),
    },
    product_description: {
      type: DataTypes.TEXT,
    },
    is_published: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    base_price: {
      type: DataTypes.STRING(10),
    },
    cart_percentage: {
      type: DataTypes.STRING(10),
    },
    percentage_multiplier: {
      type: DataTypes.STRING(10),
    },
    insurance_plan_type_id: {
      type: DataTypes.STRING(10),
    },
    is_app_enable: {
      type: DataTypes.DataTypes.ENUM("yes", "no"),
      defaultValue: "yes",
    },
    product_handle: {
      type: DataTypes.STRING(500),
    },
    is_auto_fulfill_insurance: {
      type: DataTypes.DataTypes.ENUM("0", "1"),
      defaultValue: "1",
      allowNull: false,
      comment: "0 = active, 1 = inactive",
    },
    is_development: {
      type: DataTypes.DataTypes.ENUM("0", "1"),
      defaultValue: "0",
      allowNull: false,
    },
    wizard_completed: {
      type: DataTypes.DataTypes.ENUM("0", "1"),
      defaultValue: "0",
      allowNull: false,
    },
    app_disabled_by_merchant: {
      type: DataTypes.DataTypes.ENUM("0", "1"),
      defaultValue: "0",
      allowNull: false,
    },
    subscriber_hash: {
      type: DataTypes.STRING(100),
    },
    partner: {
      type: DataTypes.TINYINT,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

Store.sync()
  .then(() => {
    console.log("Store connected");
  })
  .catch((e) => {
    console.log(e);
  });
module.exports = Store;

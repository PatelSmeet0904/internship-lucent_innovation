const Sequelize = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      store_id: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      storename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      myshopify_domain: {
        type: Sequelize.STRING,
      },
      shop_created_at: {
        type: Sequelize.STRING,
      },
      shop_owner: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.STRING,
      },
      iana_timezone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      guid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shopify_plan_name: {
        type: Sequelize.STRING(30),
      },
      plan_name: {
        type: Sequelize.STRING(100),
      },
      plan_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "pricing_plans",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      // pricing_plan:{
      //   type:Sequelize.STRING,
      //   defaultValue:null
      // },
      plan_discount: {
        type: Sequelize.STRING(50),
      },
      is_paid: {
        type: Sequelize.DataTypes.ENUM("0", "1"),
        defaultValue: "0",
        allowNull: false,
      },
      status: {
        type: Sequelize.DataTypes.ENUM("0", "1"),
        defaultValue: "0",
        allowNull: false,
      },
      is_deleted: {
        type: Sequelize.DataTypes.ENUM("0", "1"),
        defaultValue: "0",
        allowNull: false,
      },
      access_scopes: {
        type: Sequelize.TEXT,
      },
      is_shop_install: {
        type: Sequelize.DataTypes.ENUM("0", "1"),
        defaultValue: "0",
      },
      currency: {
        type: Sequelize.STRING(10),
      },
      country_code: {
        type: Sequelize.STRING(10),
      },
      currency_format: {
        type: Sequelize.STRING(50) + " CHARSET utf8 COLLATE utf8_general_ci",
        allowNull: false,
      },
      country_name: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      location_id: {
        type: Sequelize.STRING(50),
      },
      product_id: {
        type: Sequelize.STRING(50),
      },
      product_name: {
        type: Sequelize.STRING(500),
      },
      product_Image: {
        type: Sequelize.STRING(500),
      },
      product_description: {
        type: Sequelize.TEXT,
      },
      is_published: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      base_price: {
        type: Sequelize.STRING(10),
      },
      cart_percentage: {
        type: Sequelize.STRING(10),
      },
      percentage_multiplier: {
        type: Sequelize.STRING(10),
      },
      insurance_plan_type_id: {
        type: Sequelize.STRING(10),
      },
      is_app_enable: {
        type: Sequelize.DataTypes.ENUM("yes", "no"),
        defaultValue: "yes",
      },
      product_handle: {
        type: Sequelize.STRING(500),
      },
      is_auto_fulfill_insurance: {
        type: Sequelize.DataTypes.ENUM("0", "1"),
        defaultValue: "1",
        allowNull: false,
        comment: "0 = active, 1 = inactive",
      },
      is_development: {
        type: Sequelize.DataTypes.ENUM("0", "1"),
        defaultValue: "0",
        allowNull: false,
      },
      wizard_completed: {
        type: Sequelize.DataTypes.ENUM("0", "1"),
        defaultValue: "0",
        allowNull: false,
      },
      app_disabled_by_merchant: {
        type: Sequelize.DataTypes.ENUM("0", "1"),
        defaultValue: "0",
        allowNull: false,
      },
      subscriber_hash: {
        type: Sequelize.STRING(100),
      },
      partner: {
        type: Sequelize.TINYINT,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        // defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: true,
      },
    },
    {
      collate: "latin1_swedish_ci",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["id", "store_id", "myshopify_domain", "plan_id"],
        },
      ],
    }
  );
};

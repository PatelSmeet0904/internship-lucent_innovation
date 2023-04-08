const Sequelize = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define(
    "order_address",
    {
      id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      store_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: "users",
          key: "id",
        },
      },
      shopify_order_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      address1: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING(20),
      },
      city: {
        type: Sequelize.STRING(40),
      },
      zip: {
        type: Sequelize.STRING(20),
      },
      province: {
        type: Sequelize.STRING(40),
      },
      country: {
        type: Sequelize.STRING(100),
      },
      address2: {
        type: Sequelize.STRING,
      },
      country_code: {
        type: Sequelize.STRING(10),
      },
      province_code: {
        type: Sequelize.STRING(10),
      },
      is_billing_address: {
        type: Sequelize.TINYINT(4),
        defaultValue: "0",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      collate: "utf8mb4_unicode_ci",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["store_id", "id"],
        },
        {
          unique: true,
          fields: ["shopify_order_id", "is_billing_address"],
        },
      ],
    }
  );
};

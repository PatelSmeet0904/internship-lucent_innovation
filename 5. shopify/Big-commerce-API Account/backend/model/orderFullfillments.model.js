const Sequelize = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define(
    "orders_fulfilments",
    {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
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
        onDelete: "CASCADE",
      },
      shopify_order_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      fulfilment_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      fulfilment_status: {
        type: Sequelize.STRING(20),
      },
      fulfilment_service: {
        type: Sequelize.STRING(100),
      },
      tracking_company: {
        type: Sequelize.STRING(50),
      },
      tracking_url: {
        type: Sequelize.STRING(250),
      },
      location_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      tracking_number: {
        type: Sequelize.STRING(50),
      },
      is_refund: {
        type: Sequelize.TINYINT(4),
        defaultValue: "0",
        allowNull: false,
      },
      is_reorder: {
        type: Sequelize.TINYINT(4),
        defaultValue: "0",
        allowNull: false,
      },
      fulfilment_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      fulfilment_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fulfilment_updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
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
          fields: ["store_id", "shopify_order_id", "fulfilment_id"],
        },
      ],
    }
  );
};

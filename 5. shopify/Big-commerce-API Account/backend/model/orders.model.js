const Sequelize = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define(
    "orders",
    {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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
        unique: true,
        // primaryKey: true,
      },
      order_number: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      order_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      order_created_at: {
        type: Sequelize.DATE,
      },
      order_updated_at: {
        type: Sequelize.DATE,
      },
      order_cancelled_at: {
        type: Sequelize.DATE,
      },
      email: {
        type: Sequelize.STRING(100),
      },
      phone_number: {
        type: Sequelize.STRING(20),
      },
      customer_name: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      order_amount: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      fulfillment_status: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      has_claim_request: {
        type: Sequelize.ENUM("No", "Yes"),
        allowNull: false,
      },
      customer_id: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
      },
      claim_status: {
        type: Sequelize.STRING(20),
      },
      insurance_status: {
        type: Sequelize.STRING(20),
      },
      insurance_plan: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      insurance_plan_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: "insurance_plans",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      discount_amount: {
        type: Sequelize.STRING(20),
      },
      insurance_plan_amount: {
        type: Sequelize.STRING(20),
      },
      is_insurance_fulfilled: {
        type: Sequelize.ENUM("1", "0", "2"),
        comment:
          "0 = Need to fulfill, 1 = No need to fulfill, 2 = user is uncheck option from settings",
      },
      line_item_id: {
        type: Sequelize.STRING(20),
      },
      is_reorder: {
        type: Sequelize.TINYINT(4),
        defaultValue: "0",
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
          fields: [
            "store_id",
            "shopify_order_id",
            "order_number",
            "email",
            "id",
          ],
        },
      ],
    }
  );
};

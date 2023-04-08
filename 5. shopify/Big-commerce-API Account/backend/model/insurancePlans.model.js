const Sequelize = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define(
    "insurance_plans",
    {
      id: {
        allowNull: false,
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
      insurance_plan_name: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      insurance_plan_amount: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      min_order_price: {
        type: Sequelize.STRING(10),
      },
      max_order_price: {
        type: Sequelize.STRING(10),
      },
      product_ids: {
        type: Sequelize.TEXT,
      },
      product_tags: {
        type: Sequelize.TEXT,
      },
      is_gloabal_rule: {
        type: Sequelize.ENUM("Yes", "No"),
        allowNull: false,
        defaultValue: "Yes",
      },
      is_deleted: {
        type: Sequelize.TINYINT(4),
        allowNull: false,
        defaultValue: "0",
      },
      status: {
        type: Sequelize.ENUM("Active", "Inactive"),
        allowNull: false,
      },
      can_apply_after_days: {
        type: Sequelize.STRING(100),
      },
      insurance_plan_type_id: {
        type: Sequelize.STRING(2),
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
          fields: ["id", "store_id", "insurance_plan_name"],
        },
      ],
    }
  );
};

const Sequelize = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define(
    "pricing_plans",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      store_id: {
        type: Sequelize.STRING(50),
      },
      plan_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      number_of_orders: {
        type: Sequelize.STRING(100),
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.ENUM("0", "1"),
        defaultValue: "1",
        allowNull: false,
      },
      free_trial_days: {
        type: Sequelize.INTEGER,
        defaultValue: "0",
        allowNull: false,
      },
      plan_type: {
        type: Sequelize.STRING(50),
      },
      offers: {
        type: Sequelize.STRING(250),
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
      collate: "latin1_swedish_ci",
      timestamps: false,
    }
  );
};

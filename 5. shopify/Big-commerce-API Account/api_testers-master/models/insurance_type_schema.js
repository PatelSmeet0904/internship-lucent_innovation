const DataTypes = require("sequelize");
const sequelize = require("../db/index.js");

const InsurancePlanType = sequelize.define("insuranceplan_type", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  insurance_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("Active", "Inactive"),
    defaultValue: "Active",
  },
  store_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

InsurancePlanType.sync()
  .then(() => {
    console.log("Insurance Type connected");
  })
  .catch((e) => {
    console.log(e);
  });
module.exports = InsurancePlanType;

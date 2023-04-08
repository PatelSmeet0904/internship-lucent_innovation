module.exports = (sequelize, DataTypes) => {
  const customer_address = sequelize.define("Address", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address2: DataTypes.STRING,
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    shopId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "shops",
        key: "shopId",
      },
    },
  });

  return customer_address;
};

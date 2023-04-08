module.exports = (sequelize, DataTypes) => {
  const product_variant = sequelize.define("product_variant", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "0",
    },
    option1: {
      type: DataTypes.STRING,
    },
    option2: {
      type: DataTypes.STRING,
    },
    option3: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: "0",
    },
    weight_unit: {
      type: DataTypes.STRING,
    },
    inventory_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "0",
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_id: {
      type: DataTypes.STRING,
      defaultValue: null,
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

  return product_variant;
};

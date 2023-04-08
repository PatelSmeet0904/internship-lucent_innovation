module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    handle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vendor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
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

  return Product;
};

module.exports = (sequelize, DataTypes) => {
  const product_image = sequelize.define("product_image", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    product_id: {
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
    src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return product_image;
};

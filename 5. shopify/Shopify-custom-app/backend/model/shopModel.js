module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define(
    "shop",
    {
      shopId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shopName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      domain: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      scope: {
        type: DataTypes.STRING,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["shopId"],
        },
      ],
    }
  );

  return Shop;
};

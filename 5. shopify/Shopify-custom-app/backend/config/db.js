const dbConfig = require("./dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

checkConnection();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.shops = require("../model/shopModel.js")(sequelize, DataTypes);
db.customers = require("../model/customerModel.js")(sequelize, DataTypes);
db.customer_addresses = require("../model/customerAddressesModel.js")(
  sequelize,
  DataTypes
);
db.products = require("../model/productModel.js")(sequelize, DataTypes);
db.product_images = require("../model/productImageModel.js")(
  sequelize,
  DataTypes
);
db.product_variants = require("../model/productVariantModel.js")(
  sequelize,
  DataTypes
);

// customer --> address (one to Many)
db.customers.hasMany(db.customer_addresses, {
  foreignKey: "customer_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.customer_addresses.belongsTo(db.customers, {
  foreignKey: "customer_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// product --> variant (one to Many)
db.products.hasMany(db.product_variants, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.product_variants.belongsTo(db.products, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// product --> image (one to Many)
db.products.hasMany(db.product_images, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.product_images.belongsTo(db.products, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// image <-- variant (Many to One)
db.product_images.hasMany(db.product_variants, {
  foreignKey: "image_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.product_variants.belongsTo(db.product_images, {
  foreignKey: "image_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// shop --> customer (one to Many)
db.shops.hasMany(db.customers, {
  foreignKey: "shopId",
  onDelete: "CASCADE",
});
db.customers.belongsTo(db.shops, {
  foreignKey: "shopId",
  onDelete: "CASCADE",
});

// shop --> product (one to Many)
db.shops.hasMany(db.products, {
  foreignKey: "shopId",
  onDelete: "CASCADE",
});
db.products.belongsTo(db.shops, {
  foreignKey: "shopId",
  onDelete: "CASCADE",
});

db.sequelize.sync({ alter: true }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;

const Sequelize = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define("order_line_items", {
    id: {
      type: Sequelize.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    store_id: {
      type: Sequelize.INTEGER(11),
      references: {
        model: 'users',
        key: 'id'
      }
    },
    line_item_id: {
      type: Sequelize.STRING(20),
      allowNull: false,
      
    },
    fulfillment_id: {
      type: Sequelize.STRING(20),
    },
    shopify_order_id: {
      type: Sequelize.STRING(20),
    },
    title: {
      type: Sequelize.STRING(100),
      
    },
    price: {
      type: Sequelize.DOUBLE(16, 2)
    },
    quantity: {
      type: Sequelize.INTEGER,
      
    },
    total_discount: {
      type: Sequelize.DOUBLE(16, 2)
    },
    discount_allocation: {
      type: Sequelize.DOUBLE(16, 2)
    },
    variant_id: {
      type: Sequelize.STRING(40),
      
    },
    product_id: {
      type: Sequelize.STRING(40)
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true
    }
  },
    {
      collate: 'utf8mb4_unicode_ci',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['store_id','line_item_id','fulfillment_id']
        }
      ]
    })
};
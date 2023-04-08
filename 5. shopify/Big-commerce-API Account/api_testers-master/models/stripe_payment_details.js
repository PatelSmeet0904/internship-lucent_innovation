const { DataTypes } = require('sequelize');
const sequelize = require('../db/index.js');

const StripePaymentDetails = sequelize.define('stripe_payment_details', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  pricing_plan_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    // references: {
    //   model: 'pricing_plans',
    //   key: 'id'
    // }
  },
  stripe_pricing_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: 'stripe_prices',
      key: 'id'
    }
  },
  payment_link_id: {
    type: DataTypes.STRING(155),
    allowNull: true
  },
  payment_link_status: {
    type: DataTypes.STRING(55),
    allowNull: true
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'store_id'
    }
  },
  checkout_session_id: {
    type: DataTypes.STRING(155),
    allowNull: true
  },
  is_payment_link_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  status: {
    type: DataTypes.STRING(55),
    allowNull: true
  },
  subscription_id: {
    type: DataTypes.STRING(155),
    allowNull: true
  }
}, {
  tableName: 'stripe_payment_details',
});


StripePaymentDetails.sync()
.then(() => {
  console.log("StripePaymentDetails connected");
})
.catch((e) => {
  console.log(e);
});
module.exports = StripePaymentDetails;

const db = require("../config/db.js");
const {
  createOrUpdateCustomerDatabase,
} = require("../helper/CreateOrUpdateCustomerDatabase.js");
const Customer = db.customers;
const Address = db.customer_addresses;
const Op = db.Sequelize.Op;
const Shopify = require("shopify-api-node");

// @desc    Register Customer
// @route   POST /api/customer/
// @access  Public
const createCustomer = async (req, res) => {
  try {
    const { domain, accessToken, shopId } = req.shop.dataValues;
    console.log(req.body);
    const shopify = new Shopify({
      shopName: domain,
      accessToken: accessToken,
    });
    const customer = await shopify.customer.create(req.body);
    const customerList = [customer];
    if (customer) {
      await createOrUpdateCustomerDatabase(customerList, shopId);
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ Message: error.message });
    console.log(error.message);
  }
};

// @desc    Get Customer
// @route   GET /api/customer/:id
// @access  Private/Admin
const getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;

    const customer = await Customer.findByPk(customerId, {
      include: [{ model: Address }],
    });
    res.status(200).json(customer);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

// @desc    Get all Customers
// @route   GET /api/customer/
// @access  Private/Admin
const getCustomers = async (req, res) => {
  try {
    const { pageNumber, keyword } = req.query;
    const pageSize = 10;
    const page = Number(pageNumber) || 1;
    let condition = keyword
      ? {
          [Op.or]: [
            { fname: { [Op.like]: `%${keyword}%` } },
            { lname: { [Op.like]: `%${keyword}%` } },
            { email: { [Op.like]: `%${keyword}%` } },
            { phone: { [Op.like]: `%${keyword}%` } },
          ],
        }
      : null;

    const { count } = await Customer.findAndCountAll({
      where: condition,
    });
    const data = await Customer.findAll({
      where: condition,
      include: [{ model: Address }],
      offset: pageSize * (page - 1),
      limit: pageSize,
    });
    res.status(200).json({ count, data });
  } catch (error) {
    res.status(400).json({ Message: "Failed to load customer!!!" });
  }
};

// @desc    Update Customer
// @route   PUT /api/customer/:id
// @access  Private/Admin
const updateCustomer = async (req, res) => {
  try {
    const { domain, accessToken, shopId } = req.shop.dataValues;
    const customerId = req.params.id;

    const shopify = new Shopify({
      shopName: domain,
      accessToken: accessToken,
    });

    const customer = await shopify.customer.update(customerId, req.body);
    const customerList = [customer];
    await createOrUpdateCustomerDatabase(customerList, shopId);
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ Message: "Failed to update!!!" });
  }
};

// @desc    Delete Customer
// @route   DELETE /api/Customer/:id
// @access  Private/Admin
const deleteCustomer = async (req, res) => {
  try {
    const { domain, accessToken } = req.shop.dataValues;
    const customerId = req.params.id;

    const shopify = new Shopify({
      shopName: domain,
      accessToken: accessToken,
    });

    await shopify.customer.delete(customerId);
    await Customer.destroy({
      where: {
        id: customerId,
      },
      include: [{ model: Address }],
    });
    res.json({ Message: "Customer removed" });
  } catch (error) {
    res.json({ Message: "Customer not found" });
  }
};

module.exports = {
  createCustomer,
  getCustomerById,
  getCustomers,
  deleteCustomer,
  updateCustomer,
};

const { default: axios } = require("axios");
const Variants = require("../models/variant_schema");
const config = {
  "X-auth-token": "sqfxsc9b8gstdg6w8ce5j4a7560kwk9",
  Accept: "application/json",
};

const fixedVariantGenerate = (
  minCartAmount,
  maxCartAmount,
  percentageAmount
) => {
  let arr = [];

  let diff =
    Math.round(((maxCartAmount - minCartAmount) / 99 + Number.EPSILON) * 100) /
    100;

  for (let i = 1; i <= 99; i++) {
    let tempObj = {};

    tempObj.cart_min_price =
      Math.round((minCartAmount + Number.EPSILON) * 100) / 100;

    tempObj.cart_max_price =
      Math.round((minCartAmount + diff + Number.EPSILON) * 100) / 100;

    tempObj.amount =
      Math.round(
        ((tempObj.cart_max_price / 100) * percentageAmount + Number.EPSILON) *
          100
      ) / 100;

    tempObj.protection_plan_name = `plan ${i}`;

    minCartAmount = tempObj.cart_max_price;

    arr.push(tempObj);
  }

  return arr;
};
function number_format(number, decimals) {
  let decimalSeparator = ".";
  let thousandsSeparator = ",";
  decimals = typeof decimals !== "undefined" ? decimals : 2;
  decimalSeparator =
    typeof decimalSeparator !== "undefined" ? decimalSeparator : ".";
  thousandsSeparator =
    typeof thousandsSeparator !== "undefined" ? thousandsSeparator : ",";
  var parts = number.toFixed(decimals).toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  return parts.join(decimalSeparator);
}
const createVariantWithMutation = (percentage_multiplier, base_price) => {
  let percentageMultiplier = percentage_multiplier;
  let basePrice = base_price;
  let variants = [];
  for (var i = 1; i <= 99; i++) {
    let price;
    if (i == 1) {
      price = number_format(basePrice, 2);
    } else {
      basePrice = parseFloat(basePrice) + parseFloat(percentageMultiplier);
      price = number_format(basePrice, 2);
    }
    let variantData = {
      insurance_plan_name: `plan ${i}`,
      insurance_plan_amount: price,
    };
    variants.push(variantData);
  }
  return variants;
};

const createProducts = async (productData, price) => {
  const variants = price.map((i) => {
    return {
      sku: i.insurance_plan_name,
      price: i.insurance_plan_amount,
      option_values: [
        {
          option_display_name: "plans",
          label: i.insurance_plan_name,
        },
      ],
    };
  });

  try {
    const response = await axios.post(
      "https://api.bigcommerce.com/stores/rdcj5fgm6a/v3/catalog/products",
      {
        name: productData.title,
        description: productData.description,
        type: productData.product_type,
        price: 0,
        weight: 0,
        images: [
          {
            image_url: productData.image,
            is_thumbnail: true,
          },
        ],
        variants,
        is_visible: productData.is_visible,
        sku: productData.sku,
      },
      { headers: config }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const updateProducts = async (productData, price, id) => {
  const getVariantData = await Variants.findAll({});
  const variants = price.map((i, key) => {
    return {
      product_id: parseInt(id),
      price: parseFloat(i.insurance_plan_amount),
      id: parseInt(getVariantData[key].dataValues.variant_id),
    };
  });
  console.log(id, variants);
  try {
    const response = await axios.put(
      `https://api.bigcommerce.com/stores/rdcj5fgm6a/v3/catalog/products/${id}`,
      {
        variants,
      },
      { headers: config }
    );
    return response;
  } catch (error) {
    console.log(error, "called");
    throw new Error(error);
  }
};

const getAllVariants = async (id) => {
  try {
    const res = await axios.get(
      `https://api.bigcommerce.com/stores/rdcj5fgm6a/v3/catalog/products/${id}/variants?limit=100`,

      { headers: config }
    );
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports = {
  fixedVariantGenerate,
  createProducts,
  createVariantWithMutation,
  updateProducts,
  getAllVariants,
};

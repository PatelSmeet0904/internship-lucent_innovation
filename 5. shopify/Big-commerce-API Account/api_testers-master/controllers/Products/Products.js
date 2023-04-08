const { default: axios } = require("axios");
const Products = require("../../models/product_schema.js");
const Variants = require("../../models/variant_schema.js");
const {
  createProducts,
  updateProducts,
  getAllVariants,
  createVariantWithMutation,
  // setActiveInactiveProduct,
} = require("../../helper/helper.js");
const Insurance_Plans = require("../../models/insurance_plans_schema.js");
const Insurance_Product_Mapping = require("../../models/product_mapping_schema.js");
const Store = require("../../models/store_schema.js");
const config = {
  "X-auth-token": "sqfxsc9b8gstdg6w8ce5j4a7560kwk9",
  Accept: "application/json",
};
// Add Products
const addProductController = async (req, res) => {
  const store_id = "rdcj5fgm6a";
  const { insurance_plan_type_id } = req.body;

  // To create 99 variants
  const price_plan = createVariantWithMutation(
    req.body.percentage_multiplier,
    req.body.base_price
  );
  // Add new Insurance Plans
  const newInsurancePlans = price_plan.map((i) => {
    return {
      status: "active",
      store_id: "rdcj5fgm6a",
      insurance_plan_name: i.insurance_plan_name,
      insurance_plan_amount: i.insurance_plan_amount,
      min_order_price: null,
      max_order_price: null,
    };
  });
  // Check if plan exists
  const isPlanExists = await Insurance_Product_Mapping.findOne({
    where: {
      store_id,
      insurance_type_id: insurance_plan_type_id,
    },
  });
  // If yes than update the variants
  if (isPlanExists) {
    try {
      // this will update the products
      const response = await updateProducts(

        req.body,
        price_plan,
        isPlanExists.dataValues.product_id
      );

      if (response) {
        // Get the data of all variants
        const variants = await getAllVariants(
          isPlanExists.dataValues.product_id
        );
        Promise.all(
          // Update the variants data in database
          variants?.data?.data.map(async (i, key) => {
            await Variants.update(
              {
                price: i.price,
              },
              {
                where: {
                  variant_id: i.id,
                },
              }
            );
          })
        );
        // Get the data of all updated variants
        const updatedVariants = await Variants.findAll({
          where: {
            product_id: isPlanExists.dataValues.product_id,
          },
        });
        // console.log(updatedVariants);
        Promise.all(
          price_plan.map(async (i, key) => {
            console.log(updatedVariants[key].dataValues.insurance_plan_id);
            // Update Insurance plans
            await Insurance_Plans.update(
              {
                insurance_plan_amount: i.insurance_plan_amount,
              },
              {
                where: {
                  id: updatedVariants[key].dataValues.insurance_plan_id,
                },
              }
            );
          })
        );
        await Store.update(
          {
            insurance_plan_type_id: insurance_plan_type_id,

            percentage_multiplier: req.body.percentage_multiplier,

            base_price: req.body.base_price,

            // cart_percentage: req.body.cart_percentage,
          },

          {
            where: {
              store_id,
            },
          }
        );
        res.status(201).json({
          status: 0,
          message: "Insurance type selected successfully!!",
        });
      }
    } catch (error) {
      res?.status(500).json({ error: error.message });
    }
  } else {
    try {
      //Create new product in big commerce
      const response = await createProducts(req.body, price_plan);
      if (response) {
        try {
          const data = response?.data?.data;
          const image = await axios.get(
            `https://api.bigcommerce.com/stores/rdcj5fgm6a/v3/catalog/products/${response.data.data.id}/images`,
            { headers: config }
          );
          //Create new product in our database
          const result = await Products.create({
            id: data.id,
            title: data.name,
            product_type: data.type,
            description: data.description,
            price: data.price,
            weight: data.weight,
            image: image.data?.data[0].url_standard,
            is_visible: data.is_visible,
            sku: data.sku,
            vendor: "SimplyInsurance",
            inventory_management: data.inventory_tracking,
          });

          //Create Insurance_Product_Mapping
          await Insurance_Product_Mapping.create({
            insurance_type_id: insurance_plan_type_id,
            product_id: data.id,
            product_handle: null,
            store_id: "rdcj5fgm6a",
          });
          //Create Insurance_Plans
          const insurancePlansResponse = await Insurance_Plans.bulkCreate(
            newInsurancePlans
          );
          //Create new variants
          const newVariants = response?.data?.data.variants.map((i, key) => {
            return {
              store_id: "rdcj5fgm6a",
              product_id: data.id,
              variant_id: i.id,
              sku: i.sku,
              price: i.price,
              variant_name: i.option_values[0].label,
              insurance_plan_id: insurancePlansResponse[key].dataValues.id,
            };
          });
          if (result) {
            await Variants.bulkCreate(newVariants);
            await Store.update(
              {
                product_id: response.data.data.id,
                product_name: data.name,
                product_image: image.data?.data[0].url_standard,
                product_description: data.description,
                insurance_plan_type_id: insurance_plan_type_id,
                percentage_multiplier: req.body.percentage_multiplier,
                base_price: req.body.base_price,
                // cart_percentage: req.body.cart_percentage,
              },

              {
                where: {
                  store_id,   
                },
              }
            );
            res.status(201).json({
              status: 0,
              message: "Insurance type selected successfully!!",
            });
          }
        } catch (error) {
          res?.status(500).json({ error: error.message });
        }
      }
    } catch (error) {
      res?.status(500).json({ error: error.message });
    }
  }
};

module.exports = {
  addProductController,
};

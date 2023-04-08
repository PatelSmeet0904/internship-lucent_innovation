const db = require("../config/db.js");
const Product = db.products;
const Variant = db.product_variants;
const Image = db.product_images;

const createOrUpdateProductDatabase = async (data, shopId) => {
  for (let product of data) {
    const [dbProduct, created] = await Product.upsert({
      id: product.id,
      title: product.title,
      description: product.body_html,
      vendor: product.vendor,
      product_type: product.product_type,
      handle: product.handle,
      status: product.status,
      tags: product.tags,
      shopId: shopId,
    });

    // loop through each image of the product and insert/update it in the Image table
    for (let image of product.images) {
      const [i, c] = await Image.upsert({
        id: image.id,
        src: image.src,
        product_id: image.product_id,
        shopId: shopId,
      });
    }

    // loop through each variant of the product and insert/update it in the Variant table
    for (let variant of product.variants) {
      const [v, c] = await Variant.upsert({
        id: variant.id,
        title: variant.title,
        sku: variant.sku,
        price: variant.price,
        option1: variant.option1,
        option2: variant.option2,
        option3: variant.option3,
        weight: variant.weight,
        weight_unit: variant.weight_unit,
        inventory_quantity: variant.inventory_quantity,
        product_id: variant.product_id,
        image_id: variant.image_id,
        shopId: shopId,
      });
    }
  }
};

module.exports = { createOrUpdateProductDatabase };

const checkoutStripeController = async (req, res) => {
  const stripe = require("stripe")("sk_test_51MsIReJn4PBlbdKmoFUnLcOeRklaeb53HRKS726yOSaLySK2PSPH3Vu29V9ad06CzqBv8iLOs0jEvuUgYcJ6vmmR00PFxjMne6");
  const product = await stripe.products.create({
    name: 'Gold Special',
  });
  const price = await stripe.prices.create({
    unit_amount: 1200,
    currency: 'usd',
    recurring: {interval: 'month'},
    product: product.id,
  });
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    metadata:{
      storeId:"xyzz"
    },
    after_completion: {type: 'redirect', redirect: {url: 'https://localhost5000/'}},
    
  });
//   res.redirect(paymentLink.url);
  console.log(paymentLink.url);

};
module.exports = checkoutStripeController;

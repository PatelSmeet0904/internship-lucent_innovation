const stripe = require("stripe")(
  "sk_test_51MsIReJn4PBlbdKmoFUnLcOeRklaeb53HRKS726yOSaLySK2PSPH3Vu29V9ad06CzqBv8iLOs0jEvuUgYcJ6vmmR00PFxjMne6"
);
const StripeSchema = require("../../models/stripe_schema");

const webhookStripe = async (request, response) => {
  const endpointSecret = "whsec_UJPoKPX5ye11eYW9YEuwRtsL5e1HWejy";
  const sig = request.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log(err);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  console.log(event);
  const payment_link = event.data.object.payment_link;

  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object; 
      break;
    case "checkout.session.async_payment_succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object; // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      const paymentLink = await stripe.paymentLinks.update(payment_link, {
        active: false,
      });

      console.log("COMPLETED DEACTIVATING LINK");
      break;
    case "checkout.session.expired":
      const checkoutSessionExpired = event.data.object; // Then define and call a function to handle the event checkout.session.expired
      break; // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  } // Return a 200 response to acknowledge receipt of the event
  const data = event.data.object;
  const ifStoreSchemaExists = await StripeSchema.findOne({
    where: {
      store_id: data.metadata.storeId,
    },
  });
  if (ifStoreSchemaExists) {
    // response.status(201).json("Payment done!!");
    console.log("HUH");
    await StripeSchema.update(
      {
        payment_link: data.payment_link,
        price_plan_id: 1,
        total_amount: data.amount_total,
        payment_status: data.payment_status,
        subscription_id: data.subscription,
        customer_id: data.customer,
        invoice: data.invoice,
        store_id: data.metadata.storeId,
      },
      {
        where: {
          store_id: data.metadata.storeId,
        },
      }
    );
  } else {
    await StripeSchema.create({
      payment_link: data.payment_link,
      price_plan_id: 1,
      total_amount: data.amount_total,
      payment_status: data.payment_status,
      subscription_id: data.subscription,
      customer_id: data.customer,
      invoice: data.invoice,
      store_id: data.metadata.storeId,
    });
  }
  response.status(201).json("Payment done!!");
};
module.exports = webhookStripe;
// app.listen(4242, () => console.log("Running on port 4242"));

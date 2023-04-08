require("dotenv").config();
const express = require("express");
require("./models/insurance_plans_schema.js");
require("./models/insurance_type_schema.js")
require("./models/product_mapping_schema.js");
require("./models/stripe_payment_details.js")
require("./models/stripe_price.js")
require("./models/stripe_products.js")
require("./models/stripe_schema.js")

const router = require("./routes/product_routes.js");
const webhookStripe = require("./controllers/Stripe/stripeWebHook.js");
const app = express();
require("./db/index.js");


// app.use(express.json());
app.use(express.raw({ type: 'application/json' }));

app.use("/bigcommerce", router);
app.use("/webhook", webhookStripe);

app.listen(process.env.PORT_NO || 5000, () => {
    console.log(`Server started on 5000`);
});
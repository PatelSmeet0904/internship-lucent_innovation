const express = require("express");
const dotenv = require("dotenv");

require("./config/db.js");

const customerRoutes = require("./routes/customerRoutes.js");
const shopRoutes = require("./routes/shopRoutes.js");
const productRoutes = require("./routes/productRoutes.js");

const cors = require("cors");
const path = require("node:path");

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { SHOPIFY_APP_HOST, SHOPIFY_APP_PORT } = process.env;

app.get("/", async (req, res) => {
  const filename = __dirname + "/Login/index.html";
  return res.sendFile(filename);
});

// routes
app.use("/api/customer", customerRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/product", productRoutes);
// app.use("/api/upload", uploadRoutes);

app.listen(SHOPIFY_APP_PORT, () => {
  console.log(
    `App listening at https://${SHOPIFY_APP_HOST}:${SHOPIFY_APP_PORT}`
  );
});

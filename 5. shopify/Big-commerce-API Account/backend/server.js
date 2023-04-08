const express = require("express");
const dotenv = require("dotenv");
require("./config/db.js");
const shopRoutes = require("./routes/shopRoutes.js");
const webhookRoutes = require("./routes/webhookRoutes.js");
const cors = require("cors");
const path = require("node:path");
const { callback } = require("./helper/OAuthHelper");

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../frontend/dist"));

const { APP_HOST, APP_PORT } = process.env;

app.get("/", async (req, res) => {
  return res.send("hi");
});

// routes
app.use("/bigcommerce", shopRoutes);
app.use("/webhook", webhookRoutes);

app.listen(APP_PORT, () => {
  console.log(`App listening at https://${APP_HOST}:${APP_PORT}`);
});

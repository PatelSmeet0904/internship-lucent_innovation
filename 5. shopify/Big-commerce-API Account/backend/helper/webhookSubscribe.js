const axios = require("axios");

const subscribeWebhook = async (accessToken) => {
  const webhookList = [];
  webhookList.push({
    scope: "store/order/created",
    destination: `${process.env.NGROK_URL}/webhook/createOrder`,
    is_active: true,
  });

  webhookList.push({
    scope: "store/order/updated",
    destination: `${process.env.NGROK_URL}/webhook/updateOrder`,
    is_active: true,
  });
  webhookList.push({
    scope: "store/order/archived",
    destination: `${process.env.NGROK_URL}/webhook/archiveOrder`,
    is_active: true,
  });

  try {
    const url = "https://api.bigcommerce.com/stores/81tkkbgg5g/v3/hooks";
    console.log(accessToken, process.env.CLIENT_ID);
    for (const item of webhookList) {
      await axios.post(url, item, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Auth-Token": accessToken,
          "X-Auth-Client": `${process.env.CLIENT_ID}`,
        },
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { subscribeWebhook };

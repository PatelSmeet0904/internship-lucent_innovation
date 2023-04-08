const axios = require("axios");

const authorize = async (shop) => {
  return encodeURI(
    `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${process.env.CLIENT_KEY}&scope=${process.env.SHOPIFY_APP_SCOPES}&redirect_uri=${process.env.SHOPIFY_APP_REDIRECT_URL}`
  );
};

const redirectURL = async (code, shop) => {
  try {
    let url = `https://${shop}/admin/oauth/access_token?client_id=${process.env.CLIENT_KEY}&client_secret=${process.env.CLIENT_SECRET}&code=${code}
`;
    const { data } = await axios.post(url, {});
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { authorize, redirectURL };

//http://localhost:3000/api/shopify/redirect?code=fa5c666a016a83aa29318d70b9f4218a&hmac=4efc8880d8d2e0e6e8e62ca8ac8d01f0506278aba8ab6c8af49a53437fbdfd75&host=YWRtaW4uc2hvcGlmeS5jb20vc3RvcmUvcHJvLXNob3Atc21lZXQ&shop=pro-shop-smeet.myshopify.com&state=12345&timestamp=1678887547

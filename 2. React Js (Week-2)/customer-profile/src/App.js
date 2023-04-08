import { useContext, useEffect } from "react";
import "./App.scss";
import UserContext from "./store/user-context";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Loader from "./components/Loader/Loader";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import AddressScreen from "./screens/Address/AddressScreen";
import OrdersScreen from "./screens/AllOrders/OrdersScreen";
import Products from "./screens/OrderProducts/ProductsScreen";
import ProductScreen from "./screens/Product/ProductScreen";
import UpdateProfileScreen from "./screens/Update-Profile/UpdateProfile";

function App() {
  const { loading, getProfile } = useContext(UserContext);

  useEffect(() => {
    getProfile(
      "https://cdn.shopify.com/s/files/1/0017/3103/5196/files/ExampleQuery_1.json?v=1673248503"
    );
  }, []);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<ProfileScreen />} />
          <Route path="/updateProfile" element={<UpdateProfileScreen />} />
          <Route path="/address" element={<AddressScreen />} />
          <Route path="/orders" element={<OrdersScreen />} />
          <Route path="/orders/:orderId" element={<Products />} />
          <Route
            path="/orders/:orderId/:productId"
            element={<ProductScreen />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;

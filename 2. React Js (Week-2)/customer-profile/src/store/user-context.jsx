import { createContext, useState } from "react";

const UserContext = createContext({
  loading: true,
  customer: {},
  updateCustomer: () => {},
  orders: {},
  defaultAddress: {},
  setDefaultAddress: (address) => {},
  addresses: {},
  defId: String,
  setDefId: (id) => {},
  getProfile: (url) => {},
});

export function UserContextProvider(props) {
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [defAddress, setDefAddress] = useState({});

  const getProfile = async (url) => {
    try {
      const res = await fetch(url);

      if (res.status === 200) {
        const data = await res.json();
        console.log(data.data.customer);
        setCustomer(data.data.customer);
        setDefAddress(data.data.customer.defaultAddress);
        setId(defAddress.id);
        setLoading(false);
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const updateCustomer = (newData) => {
    setCustomer(newData);
  };

  const context = {
    loading: loading,
    customer: customer,
    updateCustomer: updateCustomer,
    orders: customer.orders,
    getProfile: getProfile,
    addresses: customer.addresses,
    defaultAddress: defAddress,
    setDefaultAddress: setDefAddress,
    defId: id,
    setDefId: setId,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;

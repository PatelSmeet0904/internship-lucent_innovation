import { createContext, useState } from "react";

const UserContext = createContext({
  loading: true,
  customer: {},
  orders: {},
  defaultAddress: {},
  addresses: {},
  defId: String,
  setDefId: (id) => {},
  getProfile: (url) => {},
});

export function UserContextProvider(props) {
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');

  const getProfile = async (url) => {
    try {
      const res = await fetch(url);

      if (res.status === 200) {
        const data = await res.json();
        console.log(data.data.customer);
        setCustomer(data.data.customer);
        setId(data.data.customer.defaultAddress.id)
        setLoading(false);
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const setDefId = (id) => {
    setId(id);
  };

  const context = {
    loading: loading,
    customer: customer,
    orders: customer.orders,
    defaultAddress: customer.defaultAddress,
    addresses: customer.addresses,
    defId: id,
    getProfile: getProfile,
    setDefId: setDefId,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;

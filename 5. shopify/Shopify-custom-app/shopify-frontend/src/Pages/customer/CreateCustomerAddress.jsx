import {
  Button,
  Form,
  FormLayout,
  Page,
  Icon,
  ButtonGroup,
  Text,
  TextField,
  AlphaCard,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeEmojis, validateEmail } from "../../utils/Helper";
import {
  createCustomer,
  setCustomerProfile,
} from "../../features/customer/CreateCustomerSlice";
import { MobilePlusMajor, DeleteMajor } from "@shopify/polaris-icons";
import { showToast } from "../../features/toast/ToastSlice";
import Loader from "../../Components/Loader";

const CreateCustomer = () => {
  const { loading, error, customer } = useSelector(
    (state) => state.createCustomer
  );
  const { loggedInShop } = useSelector((state) => state.shopLogin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // const [addressList, setAddressList] = useState([
  //   {
  //     address1: "Size",
  //     address2: "",
  //     country: "",
  //     zip: "",
  //     default: true,
  //   },
  // ]);

  // const handleAddressChange = (value, name, index) => {
  //   const list = [...addressList];
  //   list[index][name] = value;
  //   setAddressList(list);
  // };

  // const handleAddressRemove = (index) => {
  //   console.log(index);
  //   console.log(addressList);
  //   const list = [...addressList];
  //   list.splice(index, 1);
  //   console.log(list);
  //   setAddressList(list);
  // };

  // const handleAddAddress = () => {
  //   setAddressList([
  //     ...addressList,
  //     {
  //       address1: "Size",
  //       address2: "",
  //       country: "",
  //       zip: "",
  //       default: false,
  //     },
  //   ]);
  // };

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(
        showToast({
          message: "Error in creating a customer!!",
          error: true,
        })
      );
    }

    if (customer?.id && !loading) {
      dispatch(
        showToast({ message: "Customer Created Successfully!!!", error: false })
      );
      setEmail("");
      setFname("");
      setLname("");
      setPhone("");
      dispatch(setCustomerProfile({}));
      navigate("/admin/customers");
    }
  }, [error, customer, loading, navigate, dispatch]);

  const handleSubmit = () => {
    console.log("Form submitted");

    const isEmailValid = validateEmail(email);

    if (!fname || !lname || !email || !phone) {
      dispatch(
        showToast({ message: "All Fields are Requiered!!", error: true })
      );
    } else if (isNaN(Number(phone))) {
      dispatch(showToast({ message: "Phone must be number", error: true }));
    } else if (!isEmailValid) {
      dispatch(showToast({ message: "Wrong Email Pattern!!", error: true }));
    } else {
      try {
        const newFormData = {
          first_name: removeEmojis(fname),
          last_name: removeEmojis(lname),
          email,
          phone,
        };
        dispatch(createCustomer({ newFormData, token: loggedInShop.token }));
      } catch (error) {}
    }
  };

  return (
    <Page
      title="Create Customer"
      backAction={{ onAction: () => navigate(`/admin/customers`) }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <AlphaCard>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  label="First Name"
                  value={fname}
                  onChange={(v) => setFname(v)}
                  type="text"
                  required
                />
                <TextField
                  label="Last Name"
                  value={lname}
                  onChange={(v) => setLname(v)}
                  type="text"
                  required
                />
                <TextField
                  label="Email"
                  value={email}
                  onChange={(v) => setEmail(v)}
                  type="email"
                  required
                />
                <TextField
                  label="Phone"
                  value={phone}
                  maxLength={10}
                  onChange={(value) => {
                    if (value.length <= 10) {
                      setPhone(value);
                    }
                  }}
                  type="number"
                  required
                />
                <Button submit>Submit</Button>
              </FormLayout>
            </Form>
          </AlphaCard>
          <br />
          {/* <Text variant="headingLg" as="h4">
            Customer Addresses
          </Text>
          <br /> */}
          {/* {addressList.map((x, i) => {
            return (
              <FormLayout key={i}>
                <FormLayout.Group>
                  <TextField
                    type="text"
                    label="Address 1"
                    onChange={(value) => {
                      handleAddressChange(value, "address1", i);
                    }}
                    autoComplete="off"
                  />
                  <TextField
                    type="text"
                    label="Address 2"
                    onChange={(value) => {
                      handleAddressChange(value, "address2", i);
                    }}
                    autoComplete="off"
                  />
                </FormLayout.Group>
                <FormLayout.Group>
                  <TextField
                    type="text"
                    label="Country"
                    onChange={(value) => {
                      handleAddressChange(value, "country", i);
                    }}
                    autoComplete="off"
                  />
                  <TextField
                    type="text"
                    label="zip"
                    onChange={(value) => {
                      handleAddressChange(value, "zip", i);
                    }}
                    autoComplete="off"
                  />
                </FormLayout.Group>
                <ButtonGroup>
                  {addressList.length !== 1 && (
                    <Button
                      className="btn btn-danger mx-1"
                      onClick={() => handleAddressRemove(i)}
                    >
                      <Icon source={DeleteMajor} color="base" />
                    </Button>
                  )}
                  {addressList.length - 1 === i && (
                    <Button
                      className="btn btn-success"
                      onClick={handleAddAddress}
                    >
                      <Icon source={MobilePlusMajor} color="base" />
                    </Button>
                  )}
                </ButtonGroup>
                <hr />
                <br />
              </FormLayout>
            );
          })} */}
        </>
      )}
    </Page>
  );
};

export default CreateCustomer;

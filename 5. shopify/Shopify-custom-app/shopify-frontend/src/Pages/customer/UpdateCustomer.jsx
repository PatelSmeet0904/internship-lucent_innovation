import {
  AlphaCard,
  Button,
  Form,
  FormLayout,
  Page,
  TextField,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import { getCustomerDetails } from "../../features/customer/CustomerByIdSlice";
import {
  updateCustomer,
  updateCustomerData,
} from "../../features/customer/UpdateProfileSlice";
import { showToast } from "../../features/toast/ToastSlice";
import { removeEmojis, validateEmail } from "../../utils/Helper";

const UpdateCustomer = () => {
  const { loading, error, customer } = useSelector((state) => state.customer);
  const {
    loading: updateLoading,
    error: updateError,
    updatedCustomer,
  } = useSelector((state) => state.customerUpdate);
  const { loggedInShop } = useSelector((state) => state.shopLogin);

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    dispatch(getCustomerDetails({ id, token: loggedInShop.token }));
  }, [dispatch, loggedInShop, id]);

  useEffect(() => {
    if (error) {
      dispatch(
        showToast({
          message: "Failed to load customer data!!",
          error: true,
        })
      );
    }
    if (customer?.id) {
      setEmail(customer.email);
      setFname(customer.fname);
      setLname(customer.lname);
      setPhone(customer.phone);
    }
  }, [error, customer, dispatch, navigate]);

  useEffect(() => {
    if (updateError) {
      console.log(updateError);
      dispatch(
        showToast({
          message: "Error in updating data!!",
          error: true,
        })
      );
    }
    if (!updateLoading && updatedCustomer?.id) {
      console.log(updateLoading);
      dispatch(updateCustomerData({}));
      dispatch(
        showToast({
          message: "Customer Updated Successfully!!!",
          error: false,
        })
      );
      navigate("/admin/customers");
    }
  }, [updateError, updateLoading, navigate, dispatch, updatedCustomer]);

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
        const updateFormData = {
          first_name: removeEmojis(fname),
          last_name: removeEmojis(lname),
          email,
          phone,
        };
        dispatch(
          updateCustomer({ updateFormData, token: loggedInShop.token, id })
        );
      } catch (error) {}
    }
  };
  return (
    <Page
      title="Update Customer"
      backAction={{ onAction: () => navigate(`/admin/customers`) }}
    >
      {loading ? (
        <div style={{ width: "100%", height: "100vh", textAlign: "center" }}>
          <Loader />
        </div>
      ) : (
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
                disabled
              />
              <TextField
                label="Phone"
                value={phone}
                minLength={10}
                maxLength={10}
                onChange={(e) => setPhone(e)}
                type="tel"
                disabled
              />
              {updateLoading ? (
                <Button loading submit>
                  Update Customer
                </Button>
              ) : (
                <Button primary submit>
                  Update Customer
                </Button>
              )}
            </FormLayout>
          </Form>
        </AlphaCard>
      )}
    </Page>
  );
};

export default UpdateCustomer;

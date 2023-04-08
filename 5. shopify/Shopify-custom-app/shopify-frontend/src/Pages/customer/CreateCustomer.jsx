import {
  AlphaCard,
  Button,
  Form,
  FormLayout,
  Page,
  TextField,
} from "@shopify/polaris";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import TextField from "../../Components/TextField/TextField";
import {
  createCustomer,
  setCustomerProfile,
} from "../../features/customer/CreateCustomerSlice";
import { showToast } from "../../features/toast/ToastSlice";
import { validationSchema } from "../../utils/Validation";

const CreateCustomer = () => {
  const { loading, error, customer } = useSelector(
    (state) => state.createCustomer
  );
  const { loggedInShop } = useSelector((state) => state.shopLogin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dispatch(setCustomerProfile({}));
      navigate("/admin/customers");
    }
  }, [error, customer, loading, navigate, dispatch]);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        // Handle form submission
        console.log(values);
        dispatch(
          createCustomer({ newFormData: values, token: loggedInShop.token })
        );
      },
    });

  const handleChangeCustom = (value, name) => {
    handleChange({ target: { name, value } });
  };
  return (
    <Page
      title="Create Customer"
      backAction={{ onAction: () => navigate(`/admin/customers`) }}
    >
      <>
        <AlphaCard>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                label="First Name"
                name="first_name"
                id="first_name"
                value={values.first_name}
                onChange={handleChangeCustom}
                onBlur={handleBlur}
                error={touched.first_name && errors.first_name}
              />

              <TextField
                label="Last Name"
                name="last_name"
                id="last_name"
                value={values.last_name}
                onChange={handleChangeCustom}
                onBlur={handleBlur}
                error={touched.last_name && errors.last_name}
              />

              <TextField
                label="Email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChangeCustom}
                onBlur={handleBlur}
                type="email"
                error={touched.email && errors.email}
              />

              <TextField
                label="Phone"
                name="phone"
                id="phone"
                value={values.phone}
                onChange={handleChangeCustom}
                onBlur={handleBlur}
                error={touched.phone && errors.phone}
              />

              {loading ? (
                <Button loading submit>
                  Create Customer
                </Button>
              ) : (
                <Button primary submit>
                  Create Customer
                </Button>
              )}
            </FormLayout>
          </Form>
        </AlphaCard>
        <br />
      </>
    </Page>
  );
};

export default CreateCustomer;

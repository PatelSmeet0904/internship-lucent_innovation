import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone must be exactly 10 digits")
    .required("Phone is required"),
});

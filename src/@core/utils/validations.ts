import * as yup from "yup";

// LOGIN FORM VALIDATIONS
export const loginFormValidationschema = yup.object().shape({
  source: yup
    .string()
    .email("Please enter valid email address")
    .required("Email is required Field!"),
  password: yup.string().min(5).required(),
});

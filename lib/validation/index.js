import * as yup from "yup";
export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email không đúng định dạng")
    .required("Hãy nhập Email"),
  password: yup
    .string()
    .min(8, ({ min }) => `Mật khẩu phải dài hơn 8 kí tự`)
    .required("Hãy nhập mật khẩu"),
});

export const signupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email không đúng định dạng")
    .required("Hãy nhập Email"),
  password: yup
    .string()
    .min(8, ({ min }) => `Mật khẩu phải dài hơn 8 kí tự`)
    .required("Hãy nhập mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp")
    .required("Yêu cầu nhập lại mật khẩu"),
});

export const completeValidationSchema = yup.object().shape({
  name: yup.string(),
  // .required("Hãy nhập tên")
  // .min(3, ({ min }) => `Tên phải dài hơn ${min} kí tự`),
  phone: yup.string(),
  // .required("Hãy nhập số điện thoại")
  // .min(10, ({ min }) => `Số điện thoại phải dài hơn ${min} kí tự`),
  gender: yup.string(),
});

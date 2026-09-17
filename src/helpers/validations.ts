import * as Yup from 'yup';

const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address'),
  phoneNumber: Yup.string(),
  countryCode: Yup.string(),
});

const signUpValidationSchema = Yup.object().shape({
  userName: Yup.string().required('Please enter user name'),
  phoneNumber: Yup.string().required('Please enter phone number'),
  countryCode: Yup.string().required('Please provide country code'),
  email: Yup.string().required('Please enter email id'),
  companyCode: Yup.string().required('Please enter company code'),
  employeeID: Yup.string().required('Please enter employee id'),
  // address: Yup.string().required('Please enter address'),
  // emiratesId: Yup.string().required('Please enter Emirates Id'),
});

const otpValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, 'OTP must be exactly 6 digits')
    .required('OTP is required'),
  email: Yup.string().email('Please enter a valid email address').nullable(),
  userName: Yup.string().nullable(),
  adderss: Yup.string().nullable(),
  companyCode: Yup.string().nullable(),
  phoneNumber: Yup.string().nullable(),
  countryCode: Yup.string().nullable(),
  employeeID: Yup.string().nullable(),
  jobRole: Yup.string().nullable(),
  deviceId: Yup.string().nullable(),
  verificationMethod: Yup.string().nullable(),
});

const changePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Please enter Old Password'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Please enter new password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your new password'),
});

export {
  signInValidationSchema,
  signUpValidationSchema,
  changePasswordValidationSchema,
  otpValidationSchema,
};

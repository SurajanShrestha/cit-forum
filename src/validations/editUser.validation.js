import * as Yup from 'yup';
import { PasswordValidation, NewPasswordValidation, ConfirmNewPassword, PhoneValidation, AlphabetsMinMaxValidationWithReq } from './yupValidations';

export const editUserNameValidationSchema = Yup.object().shape({
  name: AlphabetsMinMaxValidationWithReq('Name', 6, 35, 'Name must be at least 6 characters long', 'Name must be at most 35 characters long'),
});

export const editUserByAdminValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  name: AlphabetsMinMaxValidationWithReq('Name', 6, 35, 'Name must be at least 6 characters long', 'Name must be at most 35 characters long'),
  contact: PhoneValidation('Contact Number', 10, 10, 'Must be 10 characters long', 'Only 10 characters allowed'),
  age: Yup.string().required('Age is required'),
  gender: Yup.string().required('Gender is required'),
  RoleId: Yup.string().required('Role is required'),
});

export const updateProfileValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  name: AlphabetsMinMaxValidationWithReq('Name', 6, 35, 'Name must be at least 6 characters long', 'Name must be at most 35 characters long'),
  contact: PhoneValidation('Contact Number', 10, 10, 'Must be 10 characters long', 'Only 10 characters allowed'),
  age: Yup.string().required('Age is required'),
  gender: Yup.string().required('Gender is required'),
});

export const updatePwValidationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  newPassword: NewPasswordValidation(),
  confirmedNewPassword: ConfirmNewPassword(),
});
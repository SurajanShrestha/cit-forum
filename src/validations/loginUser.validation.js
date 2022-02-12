import * as Yup from 'yup';
import { PasswordValidation } from './yupValidations';

export const loginUserValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});


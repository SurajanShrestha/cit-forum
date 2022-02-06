import * as Yup from 'yup';
import { AlphabetsMinMaxValidationWithReq } from './yupValidations';

export const editUserNameValidationSchema = Yup.object().shape({
  name: AlphabetsMinMaxValidationWithReq('Name', 6, 35, 'Name must be at least 6 characters long', 'Name must be at most 35 characters long'),
});


import * as Yup from 'yup';

export const createCategoryValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(2, 'Category name must be at least 2 characters long').max(50, 'Category name must be at most 50 characters long'),
});
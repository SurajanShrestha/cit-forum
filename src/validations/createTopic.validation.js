import * as Yup from 'yup';

export const createTopicValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').min(10, 'Topic must be at least 10 characters long').max(100, 'Topic must be at most 100 characters long'),
  CategoryId: Yup.string().required('Category is required'),
});


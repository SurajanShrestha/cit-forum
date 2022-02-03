import * as Yup from 'yup';

export const createReplyValidationSchema = Yup.object().shape({
  content: Yup.string().required('Content is required').min(2, 'Reply must be at least 2 characters long').max(200, 'Reply must be at most 200 characters long'),
});
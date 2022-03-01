import * as Yup from 'yup';

export const createPostAdminValidationSchema = Yup.object().shape({
  content: Yup.string().required('Content is required').min(10, 'Post must be at least 10 characters long').max(400, 'Post must be at most 400 characters long'),
  TopicId: Yup.string().required('Topic is required'),
});
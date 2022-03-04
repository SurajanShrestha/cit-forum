import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout';
import { Container, Row, Col } from 'react-bootstrap';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { Formik, Form } from 'formik';
import { http } from '../../services/httpHelper';
import { successToast, failureToast } from "../../components/common/Toast";
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { HeaderBar } from '../../components';
// import { BulletinBoard } from '../../components';
import { DiscussionBoard } from '../../components';
import { getUser } from '../../storage';
import { createPostValidationSchema } from '../../validations/createPost.validation';

const initialValues = {
    content: "",
};

function Topic() {
    const queryClient = useQueryClient();
    const formikBag = useRef();
    const { slug } = useParams();
    const [showPostField, setShowPostField] = useState(false);

    const { data: topicData, error: errorTopicData, isLoading: isLoadingTopicData } = useQuery(['topic', { slug }], () => {
        return http().get(`/topics/${slug}`);
    });

    const { data: postsData, error: errorPostsData, isLoading: isLoadingPostsData } = useQuery(['posts', { slug }], () => {
        return http().get(`/posts/byTopicId?TopicId=${slug}`);
    });

    const { mutate: createPost, error: postError, isLoading: isPosting, isSuccess: isSuccessPost } = useMutation((payload) => {
        return http().post('/posts', payload);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('topic');
            queryClient.invalidateQueries('posts');
        }
    }
    );

    useEffect(() => {
        if (errorTopicData) {
            failureToast(errorTopicData?.response?.data?.message || "Error");
        }
        if (errorPostsData) {
            failureToast(errorPostsData?.response?.data?.message || "Error");
        }
    }, [errorTopicData, errorPostsData]);

    useEffect(() => {
        if (postError) {
            failureToast("Error creating post");
        }
        if (isSuccessPost) {
            successToast("Post created");
            formikBag.current?.resetForm();
            setShowPostField(false);
        }
    }, [postError, isSuccessPost]);

    // const data = [
    //     {
    //         topic: "Predict my MMR Mega-Thread! skdnksd skd sd"
    //     },
    //     {
    //         topic: "Fees Discount must be given and it should be a significant amount"
    //     },
    //     {
    //         topic: "Canteen must be improved. There's cockroaches everywhere"
    //     },
    //     {
    //         topic: "Courses must be renewed. And practicals must be held"
    //     }
    // ];

    const handleCreatePost = () => {
        if (getUser()) {
            setShowPostField(true);
        } else {
            failureToast('You must log in to write a Post');
            setShowPostField(false);
        }
    };

    const handlePostSubmit = (values) => {
        if (getUser() && topicData) {
            createPost({
                ...values,
                UserId: getUser().id,
                TopicId: topicData.data?.id
            });
        }
    };

    return (
        <Layout>
            <Container>
                <Row>
                    <Col lg={8}>
                        {isLoadingTopicData ?
                            <p className='f-sm grayText'>Loading...</p> :
                            topicData ?
                                <HeaderBar title={topicData.data?.title} categoryId={topicData?.data?.CategoryId} categoryType={topicData.data?.Category?.name} totalPosts={topicData.data?.Posts.length} /> :
                                null
                        }
                        {!showPostField &&
                            <div className='text-end mb-2'>
                                <Button type="button" onClick={handleCreatePost}>Write a Post</Button>
                            </div>
                        }
                        {showPostField &&
                            <div className="single-form mb-3">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={createPostValidationSchema}
                                    onSubmit={handlePostSubmit}
                                    enableReinitialize
                                    innerRef={formikBag}
                                >
                                    {() => {
                                        return (
                                            <Form>
                                                <Input name="content" label="Write your post" type="textarea" rows={5} placeholder="Start writing..." />
                                                <div className="btn-container" style={{ justifyContent: 'right', paddingTop: 5 }}>
                                                    <Button type="submit" loading={isPosting}>Create Post</Button>
                                                    <Button className="ms-3" type="button" variant="secondary" onClick={() => setShowPostField(false)} >Cancel</Button>
                                                </div>
                                            </Form>
                                        )
                                    }}
                                </Formik>
                            </div>
                        }
                        {isLoadingPostsData ?
                            <p className='f-sm grayText'>Loading...</p> :
                            postsData ?
                                <DiscussionBoard postsData={postsData.data} /> :
                                null
                        }
                    </Col>
                    {/* <Col lg={4}>
                        <BulletinBoard heading="Trending" data={data} />
                    </Col> */}
                </Row>
            </Container>
        </Layout>
    );
}

export default Topic;

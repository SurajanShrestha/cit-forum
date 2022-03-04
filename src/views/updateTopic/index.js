import { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { Formik, Form } from 'formik';
import Layout from "../layout";
import { http } from "../../services/httpHelper";
import { successToast, failureToast } from "../../components/common/Toast";
import { createTopicValidationSchema } from "../../validations/createTopic.validation";
import { getUser } from "../../storage";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";

const initialValues = {
    title: "",
    CategoryId: "",
};

function UpdateTopic() {
    const history = useHistory();
    const { slug } = useParams();
    const queryClient = useQueryClient();
    const formikBag = useRef();

    const [editTopInitialValues, setEditTopInitialValues] = useState(initialValues);

    const { data: topData, error: errorTopData, isFetching: isFetchingTopData } = useQuery('topic', () => {
        return http().get(`/topics/${slug}`);
    });

    const { data: categoriesData, error: errorCategoriesData, isFetching: isFetchingCategoriesData, isSuccess: isSuccessCategoriesData } = useQuery('categories', () => {
        return http().get('/categories');
    });

    const { mutate: updateTopic, error: updateError, isLoading: isUpdating, isSuccess: isUpdateSuccess } = useMutation((payload) => {
        return http().patch(`/topics/${slug}`, payload);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('topic');
        }
    });

    const handleSubmit = (values) => {
        updateTopic(values);
    };

    useEffect(() => {
        if (topData && categoriesData) {
            setEditTopInitialValues({
                title: topData?.data?.title,
                CategoryId: topData?.data?.CategoryId,
            })
        }
    }, [topData, categoriesData]);

    useEffect(() => {
        if (isUpdateSuccess) {
            successToast("Topic successfully updated.");
            formikBag.current?.resetForm();
            history.goBack();
        }
        if (updateError) {
            failureToast(updateError?.response?.data?.message || "Error");
        }
        if (errorCategoriesData) {
            failureToast(errorCategoriesData?.response?.data?.message || "Error");
        }
    }, [isUpdateSuccess, updateError, errorCategoriesData]);

    return (
        <Layout>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Edit Topic</p>
                        <Formik
                            initialValues={editTopInitialValues}
                            validationSchema={createTopicValidationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                            innerRef={formikBag}
                        >
                            {({dirty}) => {
                                return (
                                    <Form>
                                        {errorTopData ?
                                            <p className="f-sm">Error loading topic data.</p> :
                                            isFetchingTopData ?
                                                <p className="f-sm">Loading...</p> :
                                                topData ?
                                                    <>
                                                        <Input name="title" label="Title" type="text" placeholder="Enter Topic Title" />
                                                        {isSuccessCategoriesData ?
                                                            <Select name="CategoryId" label="Category">
                                                                <option value="">Select a Category</option>
                                                                {categoriesData.data.map((cat, index) => {
                                                                    return <option value={cat.id} key={index}>{cat.name}</option>
                                                                })}
                                                            </Select> :
                                                            null
                                                        }
                                                        <div className="btn-container">
                                                            <Button type="submit" loading={isUpdating} disabled={!dirty}>Update Topic</Button>
                                                        </div>
                                                        {/* <div className="btn-container">
                                                            <Button type="submit" loading={isUpdating} disabled={!dirty}>Update Category</Button>
                                                        </div> */}
                                                    </> :
                                                    null
                                        }
                                        {/* <Input name="title" label="Title" type="text" placeholder="Enter Topic Title" />
                                        {isSuccessCategoriesData ?
                                            <Select name="CategoryId" label="Category">
                                                <option value="">Select a Category</option>
                                                {categoriesData.data.map((cat, index) => {
                                                    return <option value={cat.id} key={index}>{cat.name}</option>
                                                })}
                                            </Select> :
                                            null
                                        } */}
                                        {/* <div className="btn-container">
                                            <Button type="submit" loading={isFetchingCategoriesData || isCreatingTopic}>Start Discussion</Button>
                                        </div> */}
                                    </Form>
                                )
                            }}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default UpdateTopic;

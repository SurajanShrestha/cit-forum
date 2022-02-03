import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery, useMutation } from "react-query";
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
    // UserId: "",
    CategoryId: "",
};

function CreateTopic() {
    const history = useHistory();

    const { data: categoriesData, error: errorCategoriesData, isFetching: isFetchingCategoriesData, isSuccess: isSuccessCategoriesData } = useQuery('categories', () => {
        return http().get('/categories');
    });

    const { mutate: createTopic, error: topicError, isLoading: isCreatingTopic, isSuccess: isSuccessTopic } = useMutation((payload) => {
        return http().post('/topics', payload);
    });

    const handleSubmit = (values) => {
        if (getUser()) {
            createTopic({
                ...values,
                UserId: getUser().id,
            });
        } else {
            console.log(getUser());
        }
    };

    useEffect(() => {
        if (isSuccessTopic) {
            successToast("Topic successfully created.");
            history.replace("/");
        }
        if (topicError) {
            failureToast(topicError?.response?.data?.message || "Error");
        }
        if (errorCategoriesData) {
            failureToast(errorCategoriesData?.response?.data?.message || "Error");
        }
    }, [isSuccessTopic, topicError, errorCategoriesData]);

    return (
        <Layout>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Start a Topic for Discussion</p>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={createTopicValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {() => {
                                return (
                                    <Form>
                                        <Input name="title" label="Title" type="text" placeholder="Enter Topic Title" />
                                        {/* <Select name="gender" label="Gender">
                                            <option value="">Select a Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </Select> */}
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
                                            <Button type="submit" loading={isFetchingCategoriesData || isCreatingTopic}>Start Discussion</Button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                        {/* <form>
                            <div className="field-container">
                                <label for="topicTitleField">Title</label>
                                <input type="text" id="topicTitleField" name="topicTitle" placeholder="Enter Topic Title" required />
                            </div>
                            <div className="field-container">
                                <label for="categorySelectField">Category</label>
                                <select id="categorySelectField" name="category" required>
                                    <option value="">Select a Category</option>
                                    <option value="Politics">Politics</option>
                                    <option value="Education and Study">Education and Study</option>
                                    <option value="IT and Telecommunication">IT and Telecommunication</option>
                                    <option value="Video Games">Video Games</option>
                                    <option value="Category 5">Category 5</option>
                                    <option value="Category 6">Category 6</option>
                                    <option value="Category 7">Category 7</option>
                                </select>
                            </div>
                            <div className="field-container">
                                <label for="firstPostField">Write the first post</label>
                                <textarea id="firstPostField" name="firstPost" placeholder="Start Writing..." rows="5" required></textarea>
                                <p className="note pt-1">This will be the first post that starts the discussion. Elaborate on your views.</p>
                            </div>
                            <div className="btn-container">
                                <button type="submit" className="custom-primary-outline-btn">Start Discussion</button>
                            </div>
                        </form> */}
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default CreateTopic;

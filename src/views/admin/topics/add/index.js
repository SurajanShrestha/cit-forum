import { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form } from 'formik';
import Layout from "../../../layout";
import { http } from "../../../../services/httpHelper";
import { successToast, failureToast } from "../../../../components/common/Toast";
import { createTopicValidationSchema } from "../../../../validations/createTopic.validation";
import { getUser } from '../../../../storage';
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import Select from "../../../../components/common/Select";
import { FaEye, FaLongArrowAltLeft } from "react-icons/fa";

const initialValues = {
    title: "",
    CategoryId: "",
};

function AdminAddTopic() {
    const history = useHistory();
    const formikBag = useRef();

    const { data: categoriesData, error: errorCategoriesData, isFetching: isFetchingCategoriesData, isSuccess: isSuccessCategoriesData } = useQuery('categories', () => {
        return http().get('/categories');
    });

    const { mutate: createTop, error: errorCreatingTop, isLoading: isCreatingTop, isSuccess: isCreatingTopSuccess } = useMutation((payload) => {
        return http().post('/topics', payload);
    });

    const handleSubmit = (values) => {
        createTop({
            ...values,
            UserId: getUser().id,
        });
    };

    useEffect(() => {
        if (isCreatingTopSuccess) {
            successToast("Successfully created topic.");
            formikBag.current?.resetForm();
        }
        if (errorCreatingTop) {
            failureToast(errorCreatingTop?.response?.data?.message || "Error creating topic.");
        }
    }, [isCreatingTopSuccess, errorCreatingTop]);

    return (
        <Layout forAdminPanel={true} noFooter={true}>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Add a Topic</p>
                        <div className="w-100 d-flex justify-content-end">
                            <p className="clickable f-sm greenText" onClick={() => history.goBack()}><FaLongArrowAltLeft /> Go Back</p>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={createTopicValidationSchema}
                            onSubmit={handleSubmit}
                            innerRef={formikBag}
                        >
                            {({ dirty }) => {
                                return (
                                    <Form>
                                        <Input name="title" label="Title" type="text" placeholder="Enter Topic Title" />
                                        <Select name="CategoryId" label="Category">
                                            <option value="">Select a Category</option>
                                            {errorCategoriesData ?
                                                <option disabled>Error loading categories</option> :
                                                isFetchingCategoriesData ?
                                                    <option disabled>Loading...</option> :
                                                    isSuccessCategoriesData ?
                                                        <>
                                                            {categoriesData.data.map((cat, index) => {
                                                                return <option value={cat.id} key={index}>{cat.name}</option>
                                                            })}
                                                        </> :
                                                        null
                                            }
                                        </Select>
                                        <div className="btn-container">
                                            <Button type="submit" loading={isFetchingCategoriesData || isCreatingTop} disabled={!dirty}>Create Topic</Button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                        <p className="note">
                            <Link to="/admin/topics/view" className="clickable"><FaEye /> View Topics</Link>
                        </p>
                    </Col>
                </Row>
            </Container >
        </Layout >
    )
}

export default AdminAddTopic;

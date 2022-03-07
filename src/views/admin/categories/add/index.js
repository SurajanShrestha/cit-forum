import { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form } from 'formik';
import Layout from "../../../layout";
import { http } from "../../../../services/httpHelper";
import { getUser } from "../../../../storage";
import { successToast, failureToast } from "../../../../components/common/Toast";
import { createCategoryValidationSchema } from "../../../../validations/createCategory.validation";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import { FaEye, FaLongArrowAltLeft } from "react-icons/fa";

const initialValues = {
    name: "",
};

function AdminAddCategory() {
    const history = useHistory();
    const formikBag = useRef();

    const { mutate: createCat, error: errorCreatingCat, isLoading: isCreatingCat, isSuccess: isCreatingCatSuccess } = useMutation((payload) => {
        return http().post('/categories', payload);
    });

    const handleSubmit = (values) => {
        createCat(values);
    };

    useEffect(() => {
        if (getUser()) {
            // Even if checking user role is done by the backend, we're still making sure that no non-admin users can stay in this page.
            if (getUser()?.roleId !== 1) {
                history.replace('/admin/login');
            }
        } else {
            history.replace('/admin/login');
        }
    }, []);

    useEffect(() => {
        if (isCreatingCatSuccess) {
            successToast("Successfully created category.");
            formikBag.current?.resetForm();
        }
        if (errorCreatingCat) {
            failureToast(errorCreatingCat?.response?.data?.message || "Error creating category.");
        }
    }, [isCreatingCatSuccess, errorCreatingCat]);

    return (
        <Layout forAdminPanel={true} noFooter={true}>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Add a Category</p>
                        <div className="w-100 d-flex justify-content-end">
                            <p className="clickable f-sm greenText" onClick={() => history.goBack()}><FaLongArrowAltLeft /> Go Back</p>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={createCategoryValidationSchema}
                            onSubmit={handleSubmit}
                            innerRef={formikBag}
                        >
                            {({ dirty }) => {
                                return (
                                    <Form>
                                        <Input name="name" label="Category Name" type="text" placeholder="Eg: Sports, Physics, Politics, etc." />
                                        <div className="btn-container">
                                            <Button type="submit" loading={isCreatingCat} disabled={!dirty}>Create Category</Button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                        <p className="note">
                            <Link to="/admin/categories/view" className="clickable"><FaEye /> View Categories</Link>
                        </p>
                    </Col>
                </Row>
            </Container >
        </Layout >
    )
}

export default AdminAddCategory;

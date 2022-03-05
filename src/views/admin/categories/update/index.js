import { useState, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form } from 'formik';
import Layout from "../../../layout";
import { http } from "../../../../services/httpHelper";
import { successToast, failureToast } from "../../../../components/common/Toast";
import { createCategoryValidationSchema } from "../../../../validations/createCategory.validation";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import { FaEye, FaLongArrowAltLeft } from "react-icons/fa";

const initialValues = {
    name: "",
};

function AdminUpdateCategory() {
    const history = useHistory();
    const { slug } = useParams();
    const queryClient = useQueryClient();
    const formikBag = useRef();

    const [editCatInitialValues, setEditCatInitialValues] = useState(initialValues);

    const { data: catData, error: errorCatData, isFetching: isFetchingCatData } = useQuery('category', () => {
        return http().get(`/categories/${slug}`);
    });

    const { mutate: updateCat, error: updateError, isLoading: isUpdating, isSuccess: isUpdateSuccess } = useMutation((payload) => {
        return http().patch(`/categories/${slug}`, payload);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('category');
        }
    });

    const handleSubmit = (values) => {
        updateCat(values);
    };

    useEffect(() => {
        if (catData) {
            setEditCatInitialValues({
                name: catData?.data?.name,
            })
        }
    }, [catData]);

    useEffect(() => {
        if (isUpdateSuccess) {
            successToast("Successfully updated category.");
            formikBag.current?.resetForm();
        }
        if (updateError) {
            failureToast(updateError?.response?.data?.message || "Error creating category.");
        }
    }, [isUpdateSuccess, updateError]);

    return (
        <Layout forAdminPanel={true} noFooter={true}>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Edit a Category</p>
                        <div className="w-100 d-flex justify-content-end">
                            <p className="clickable f-sm greenText" onClick={() => history.goBack()}><FaLongArrowAltLeft /> Go Back</p>
                        </div>
                        <Formik
                            initialValues={editCatInitialValues}
                            validationSchema={createCategoryValidationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                            innerRef={formikBag}
                        >
                            {({ dirty }) => {
                                return (
                                    <Form>
                                        {errorCatData ?
                                            <p className="f-sm">Error loading category data.</p> :
                                            isFetchingCatData ?
                                                <p className="f-sm">Loading...</p> :
                                                catData ?
                                                    <>
                                                        <Input name="name" label="Category Name" type="text" placeholder="Eg: Sports, Physics, Politics, etc." />
                                                        <div className="btn-container">
                                                            <Button type="submit" loading={isUpdating} disabled={!dirty}>Update Category</Button>
                                                        </div>
                                                    </> :
                                                    null
                                        }
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

export default AdminUpdateCategory;

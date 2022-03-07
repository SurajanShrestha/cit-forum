import { useState, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form } from 'formik';
import Layout from "../../../layout";
import { http } from "../../../../services/httpHelper";
import { getUser } from '../../../../storage';
import { successToast, failureToast } from "../../../../components/common/Toast";
import { editUserByAdminValidationSchema } from "../../../../validations/editUser.validation";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import Select from "../../../../components/common/Select";
import { FaEye, FaLongArrowAltLeft } from "react-icons/fa";

const initialValues = {
    email: "",
    name: "",
    age: "",
    contact: "",
    gender: "",
    RoleId: "",
};

function AdminUpdateUser() {
    const history = useHistory();
    const { slug } = useParams();
    const queryClient = useQueryClient();
    const formikBag = useRef();

    const [editUserInitialValues, setEditUserInitialValues] = useState(initialValues);

    const { data: userData, error: errorUserData, isFetching: isFetchingUserData } = useQuery('user', () => {
        return http().get(`/users/${slug}`);
    });

    const { mutate: updateUser, error: updateError, isLoading: isUpdating, isSuccess: isUpdateSuccess } = useMutation((payload) => {
        return http().patch(`/users/${slug}`, payload);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        }
    });

    const handleSubmit = (values) => {
        updateUser(values);
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
        if (userData) {
            setEditUserInitialValues({
                email: userData?.data?.email,
                name: userData?.data?.name,
                age: userData?.data?.age.toString(),
                contact: userData?.data?.contact.toString(),
                gender: userData?.data?.gender.toString(),
                RoleId: userData?.data?.RoleId.toString(),
            })
        }
    }, [userData]);

    useEffect(() => {
        if (isUpdateSuccess) {
            successToast("Successfully updated user.");
            formikBag.current?.resetForm();
        }
        if (updateError) {
            failureToast(updateError?.response?.data?.message || "Error updating user.");
        }
    }, [isUpdateSuccess, updateError]);

    return (
        <Layout forAdminPanel={true} noFooter={true}>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Edit a User</p>
                        <div className="w-100 d-flex justify-content-end">
                            <p className="clickable f-sm greenText" onClick={() => history.goBack()}><FaLongArrowAltLeft /> Go Back</p>
                        </div>
                        <Formik
                            initialValues={editUserInitialValues}
                            validationSchema={editUserByAdminValidationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                            innerRef={formikBag}
                        >
                            {({ dirty }) => {
                                return (
                                    <Form>
                                        {errorUserData ?
                                            <p className="f-sm">Error loading user data.</p> :
                                            isFetchingUserData ?
                                                <p className="f-sm">Loading...</p> :
                                                userData ?
                                                    <>
                                                        <Input name="name" label="Full Name" type="text" placeholder="Enter your full name" />
                                                        <Select name="RoleId" label="Role">
                                                            <option value="" hidden>Select User Role</option>
                                                            <option value="1">Admin</option>
                                                            <option value="2">Normal User</option>
                                                        </Select>
                                                        <Input name="email" label="Email" type="email" placeholder="Enter your email" />
                                                        <Input name="age" label="Age" type="number" min="16" placeholder="Enter your age" />
                                                        <Select name="gender" label="Gender">
                                                            <option value="" hidden>Select a Gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>
                                                        </Select>
                                                        <Input name="contact" label="Contact" type="tel" placeholder="Enter your phone number" />
                                                        <div className="btn-container">
                                                            <Button type="submit" loading={isUpdating} disabled={!dirty}>Update User</Button>
                                                        </div>
                                                    </> :
                                                    null
                                        }
                                    </Form>
                                )
                            }}
                        </Formik>
                        <p className="note">
                            <Link to="/admin/users/view" className="clickable"><FaEye /> View Users</Link>
                        </p>
                    </Col>
                </Row>
            </Container >
        </Layout >
    )
}

export default AdminUpdateUser;

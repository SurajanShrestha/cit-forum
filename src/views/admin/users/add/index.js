import { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form } from 'formik';
import Layout from "../../../layout";
import { http } from "../../../../services/httpHelper";
import { successToast, failureToast } from "../../../../components/common/Toast";
import { registerUserByAdminValidationSchema } from "../../../../validations/registerUser.validation";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import Select from "../../../../components/common/Select";

const initialValues = {
    email: "",
    name: "",
    age: "",
    contact: "",
    gender: "",
    RoleId: "",
};

function AdminAddUser() {
    const history = useHistory();
    const formikBag = useRef();

    const { mutate: registerUser, error: registerError, isLoading: isRegistering, isSuccess: isRegisterSuccess } = useMutation((registerCred) => {
        return http().post('/users', registerCred);
    });

    const handleSubmit = (values) => {
        registerUser({
            ...values,
            password: 'Password'
        });
    };

    useEffect(() => {
        if (isRegisterSuccess) {
            successToast("Successfully created user. Please make sure to inform the user to change password.");
            formikBag.current?.resetForm();
        }
        if (registerError) {
            failureToast(registerError?.response?.data?.message || "Error creating user.");
        }
    }, [isRegisterSuccess, registerError]);

    return (
        <Layout forAdminPanel={true} noFooter={true}>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Add a User</p>
                        <div className="w-100 d-flex justify-content-end">
                            <p className="clickable f-sm greenText" onClick={() => history.goBack()}><i className='fa fa-long-arrow-left'></i> Go Back</p>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={registerUserByAdminValidationSchema}
                            onSubmit={handleSubmit}
                            innerRef={formikBag}
                        >
                            {({ dirty }) => {
                                return (
                                    <Form>
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
                                            <Button type="submit" loading={isRegistering} disabled={!dirty}>Create User</Button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                        <p className="note">
                            <Link to="/admin/users/view" className="clickable"><i class="fa fa-eye" aria-hidden="true"></i> View Users</Link>
                        </p>
                    </Col>
                </Row>
            </Container >
        </Layout >
    )
}

export default AdminAddUser;

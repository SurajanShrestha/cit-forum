import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form } from 'formik';
import Layout from "../layout";
import { http } from "../../services/httpHelper";
import { successToast, failureToast } from "../../components/common/Toast";
import { registerUserValidationSchema } from "../../validations/registerUser.validation";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";

const initialValues = {
    email: "",
    password: "",
    confirmedPassword: "",
    name: "",
    age: "",
    contact: "",
    gender: "",
    // "RoleId": 1
};

function Register() {
    const history = useHistory();

    const { mutate: registerUser, error: registerError, isLoading: isRegistering, isSuccess: isRegisterSuccess } = useMutation((registerCred) => {
        return http().post('/users', registerCred);
    });

    const handleSubmit = (values) => {
        registerUser({
            ...values,
            RoleId: 2
        });
    };

    useEffect(() => {
        if (isRegisterSuccess) {
            successToast("Successfully Registered. Please Login In with your credentials");
            history.replace("/");
        }
        if (registerError) {
            failureToast(registerError?.response?.data?.message || "Error");
        }
    }, [isRegisterSuccess, registerError]);

    return (
        <Layout>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Create an Account</p>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={registerUserValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ dirty }) => {
                                return (
                                    <Form>
                                        {/* <div className="field-container">
                                            <label for="fullNameField">Full Name</label>
                                            <input type="text" ref={fullNameEl} id="fullNameField" name="fullname" placeholder="Enter User Full Name" />
                                        </div> */}
                                        <Input name="name" label="Full Name" type="text" placeholder="Enter your full name" />
                                        <Input name="email" label="Email" type="email" placeholder="Enter your email" />
                                        <Input name="age" label="Age" type="number" min="16" placeholder="Enter your age" />
                                        <Select name="gender" label="Gender">
                                            <option value="">Select a Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </Select>
                                        <Input name="contact" label="Contact" type="tel" placeholder="Enter your phone number" />
                                        <Input name="password" label="Password" type="password" placeholder="Enter your password" />
                                        <Input name="confirmedPassword" label="Confirm Password" type="password" placeholder="Confirm your password" />
                                        <div className="btn-container">
                                            <Button type="submit" loading={isRegistering} disabled={!dirty}>Register</Button>
                                        </div>
                                        <p className="note">Already have an account? <Link to="/login">Log In</Link></p>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </Col>
                </Row>
            </Container >
        </Layout >
    )
}

export default Register;

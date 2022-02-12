import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form } from 'formik';
import Layout from "../../layout";
import { http } from "../../../services/httpHelper";
import { successToast, failureToast } from "../../../components/common/Toast";
import { loginUserValidationSchema } from "../../../validations/loginUser.validation";
import { setUser } from "../../../storage";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";

const initialValues = {
    email: "",
    password: "",
};

function AdminLogin() {
    const history = useHistory();

    const { mutate: loginUser, data: loginData, error: loginError, isLoading: isLoggingIn, isSuccess: isLoginSuccess } = useMutation((loginCred) => {
        return http().post('/users/login/admin', loginCred);
    });

    const handleSubmit = (values) => {
        loginUser(values);
    };

    useEffect(() => {
        if (isLoginSuccess) {
            successToast("Successfully Logged In");
            setUser(loginData.data?.user);
            history.replace('/admin');
        }
        if (loginError) {
            failureToast(loginError?.response?.data?.message || "Error");
        }
    }, [isLoginSuccess, loginError]);

    return (
        <Layout forAdminPanel={true} noNavbar={true}>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Admin Login</p>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={loginUserValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ dirty }) => {
                                return (
                                    <Form>
                                        <Input name="email" label="Email" type="email" placeholder="Enter your email" />
                                        <Input name="password" label="Password" type="password" placeholder="Enter your password" />
                                        <div className="btn-container">
                                            <Button type="submit" loading={isLoggingIn} disabled={!dirty}>Login</Button>
                                        </div>
                                        <p className="note">You are logging in as admin.</p>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default AdminLogin;

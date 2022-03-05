import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form } from 'formik';
import Layout from "../layout";
import { http } from "../../services/httpHelper";
import { successToast, failureToast } from "../../components/common/Toast";
import { loginUserValidationSchema } from "../../validations/loginUser.validation";
import { setUser } from "../../storage";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const initialValues = {
    email: "",
    password: "",
};

function Login() {
    const history = useHistory();
    const [showPw, setShowPw] = useState(false);

    const { mutate: loginUser, data: loginData, error: loginError, isLoading: isLoggingIn, isSuccess: isLoginSuccess } = useMutation((loginCred) => {
        return http().post('/users/login', loginCred);
    });

    const handleSubmit = (values) => {
        loginUser(values);
    };

    useEffect(() => {
        if (isLoginSuccess) {
            successToast("Successfully Logged In");
            setUser(loginData.data?.user);
            history.goBack();
        }
        if (loginError) {
            failureToast(loginError?.response?.data?.message || "Error");
        }
    }, [isLoginSuccess, loginError]);

    return (
        <Layout>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Login</p>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={loginUserValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ dirty }) => {
                                return (
                                    <Form>
                                        <Input name="email" label="Email" type="email" placeholder="Enter your email" />
                                        <div className="pw-box">
                                            {showPw ?
                                                <>
                                                    <FaEye className="see-pw-icon" onClick={() => setShowPw(false)} />
                                                    <Input name="password" label="Password" type="text" placeholder="Enter your password" />
                                                </> :
                                                <>
                                                    <FaEyeSlash className="see-pw-icon" onClick={() => setShowPw(true)} />
                                                    <Input name="password" label="Password" type="password" placeholder="Enter your password" />
                                                </>
                                            }
                                        </div>
                                        <div className="btn-container">
                                            <Button type="submit" loading={isLoggingIn} disabled={!dirty}>Login</Button>
                                        </div>
                                        <p className="note">Don't have an account? <Link to="/register">Create an Account</Link></p>
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

export default Login;

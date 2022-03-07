import { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form } from 'formik';
import Layout from "../../layout";
import { http } from "../../../services/httpHelper";
import { getUser } from "../../../storage";
import { successToast, failureToast } from "../../../components/common/Toast";
import { updatePwValidationSchema } from "../../../validations/editUser.validation";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import { FaUserAlt, FaEye, FaEyeSlash } from "react-icons/fa";

const initialValues = {
    password: "",
    newPassword: "",
    confirmedNewPassword: "",
};

function AdminUpdateUserPassword() {
    const history = useHistory();
    const formikBag = useRef();

    const [showPw1, setShowPw1] = useState(false);
    const [showPw2, setShowPw2] = useState(false);
    const [showPw3, setShowPw3] = useState(false);

    const { mutate: updatePw, error: updateError, isLoading: isUpdating, isSuccess: isUpdateSuccess } = useMutation((payload) => {
        return http().post(`/users/updatePw`, payload);
    });

    const handleSubmit = (values) => {
        updatePw({
            userId: getUser()?.id,
            oldPassword: values.password,
            newPassword: values.confirmedNewPassword
        });
    };

    // useEffect(() => {
    //     if (!getUser()) {
    //         history.replace("/");
    //     }
    // }, []);

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
        if (isUpdateSuccess) {
            successToast("Successfully updated password.");
            formikBag.current?.resetForm();
            history.replace(`/admin/userAccount/${getUser().id}`)
        }
        if (updateError) {
            failureToast(updateError?.response?.data?.message || "Error updating password.");
        }
    }, [isUpdateSuccess, updateError]);

    return (
        <Layout forAdminPanel={true} noFooter={true}>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Change your password</p>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={updatePwValidationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                            innerRef={formikBag}
                        >
                            {({ dirty }) => {
                                return (
                                    <Form>
                                        <div className="pw-box">
                                            {showPw1 ?
                                                <>
                                                    <FaEye className="see-pw-icon" onClick={() => setShowPw1(false)} />
                                                    <Input name="password" label="Old Password" type="text" placeholder="Enter your old password" />
                                                </> :
                                                <>
                                                    <FaEyeSlash className="see-pw-icon" onClick={() => setShowPw1(true)} />
                                                    <Input name="password" label="Old Password" type="password" placeholder="Enter your old password" />
                                                </>
                                            }
                                        </div>
                                        <div className="pw-box">
                                            {showPw2 ?
                                                <>
                                                    <FaEye className="see-pw-icon" onClick={() => setShowPw2(false)} />
                                                    <Input name="newPassword" label="New Password" type="text" placeholder="Enter your new password" />
                                                </> :
                                                <>
                                                    <FaEyeSlash className="see-pw-icon" onClick={() => setShowPw2(true)} />
                                                    <Input name="newPassword" label="New Password" type="password" placeholder="Enter your new password" />
                                                </>
                                            }
                                        </div>
                                        <div className="pw-box">
                                            {showPw3 ?
                                                <>
                                                    <FaEye className="see-pw-icon" onClick={() => setShowPw3(false)} />
                                                    <Input name="confirmedNewPassword" label="Confirm new Password" type="text" placeholder="Confirm your new password" />
                                                </> :
                                                <>
                                                    <FaEyeSlash className="see-pw-icon" onClick={() => setShowPw3(true)} />
                                                    <Input name="confirmedNewPassword" label="Confirm new Password" type="password" placeholder="Confirm your new password" />
                                                </>
                                            }
                                        </div>
                                        <div className="btn-container">
                                            <Button type="submit" loading={isUpdating} disabled={!dirty}>Update Password</Button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                        <p className="note">
                            <Link to={`/userAccount/${getUser()?.id}`} className="clickable"><FaUserAlt /> My Account</Link>
                        </p>
                    </Col>
                </Row>
            </Container >
        </Layout >
    )
}

export default AdminUpdateUserPassword;

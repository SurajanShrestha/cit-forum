import { useState, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form } from 'formik';
import Layout from "../layout";
import { http } from "../../services/httpHelper";
import { getUser } from "../../storage";
import { successToast, failureToast } from "../../components/common/Toast";
import { updateProfileValidationSchema } from "../../validations/editUser.validation";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import { FaLongArrowAltLeft, FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const initialValues = {
    email: "",
    name: "",
    age: "",
    contact: "",
    gender: "",
};

function UpdateUserAccount() {
    const history = useHistory();
    const { slug } = useParams();
    const queryClient = useQueryClient();
    const formikBag = useRef();

    const [editUserInitialValues, setEditUserInitialValues] = useState(initialValues);

    const { data: userData, error: errorUserData, isFetching: isFetchingUserData } = useQuery('user', () => {
        return http().get(`/users/${slug}`);
    });

    const { mutate: updateUser, data: editedUserData, error: updateError, isLoading: isUpdating, isSuccess: isUpdateSuccess } = useMutation((payload) => {
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
        if (userData) {
            setEditUserInitialValues({
                email: userData?.data?.email,
                name: userData?.data?.name,
                age: userData?.data?.age.toString(),
                contact: userData?.data?.contact.toString(),
                gender: userData?.data?.gender.toString(),
            })
        }
    }, [userData]);

    useEffect(() => {
        if (isUpdateSuccess) {
            successToast("Successfully updated user.");
            formikBag.current?.resetForm();
            const newSessionUserData = {
                ...getUser(),
                name: editedUserData?.data?.user?.name
            };
            sessionStorage.setItem('cdUser', JSON.stringify(newSessionUserData));
            window.location.reload(true);
        }
        if (updateError) {
            failureToast(updateError?.response?.data?.message || "Error updating user.");
        }
    }, [isUpdateSuccess, updateError]);

    return (
        <Layout>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Update your profile</p>
                        <div className="w-100 d-flex justify-content-end">
                            <p className="clickable f-sm greenText" onClick={() => history.goBack()}><FaLongArrowAltLeft /> Go Back</p>
                        </div>
                        <Formik
                            initialValues={editUserInitialValues}
                            validationSchema={updateProfileValidationSchema}
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
                            <Link to={`/userAccount/${slug}`} className="clickable"><FaUserAlt /> My Account</Link>
                        </p>
                        <p className="note">
                            <Link to="/userAccount/updatePw" className="clickable"><RiLockPasswordFill /> Change Password</Link>
                        </p>
                    </Col>
                </Row>
            </Container >
        </Layout >
    )
}

export default UpdateUserAccount;

import { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form } from 'formik';
import Layout from "../../../layout";
import { http } from "../../../../services/httpHelper";
import { successToast, failureToast } from "../../../../components/common/Toast";
import { createPostAdminValidationSchema } from "../../../../validations/createPostAdmin.validation";
import { getUser } from '../../../../storage';
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import Select from "../../../../components/common/Select";
import { FaEye, FaLongArrowAltLeft } from "react-icons/fa";

const initialValues = {
    content: "",
    TopicId: "",
};

function AdminAddPost() {
    const history = useHistory();
    const formikBag = useRef();

    const { data: topData, error: errorTopData, isFetching: isFetchingTopData, isSuccess: isSuccessTopData } = useQuery('topics', () => {
        return http().get('/topics');
    });

    const { mutate: createPos, error: errorCreatingPos, isLoading: isCreatingPos, isSuccess: isCreatingPosSuccess } = useMutation((payload) => {
        return http().post('/posts', payload);
    });

    const handleSubmit = (values) => {
        createPos({
            ...values,
            UserId: getUser().id,
        });
        // createTop({
        //     ...values,
        //     UserId: getUser().id,
        // });
    };

    useEffect(() => {
        if (isCreatingPosSuccess) {
            successToast("Successfully created post.");
            formikBag.current?.resetForm();
        }
        if (errorCreatingPos) {
            failureToast(errorCreatingPos?.response?.data?.message || "Error creating post.");
        }
    }, [isCreatingPosSuccess, errorCreatingPos]);

    return (
        <Layout forAdminPanel={true} noFooter={true}>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Add a Post</p>
                        <div className="w-100 d-flex justify-content-end">
                            <p className="clickable f-sm greenText" onClick={() => history.goBack()}><FaLongArrowAltLeft /> Go Back</p>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={createPostAdminValidationSchema}
                            onSubmit={handleSubmit}
                            innerRef={formikBag}
                        >
                            {({ dirty }) => {
                                return (
                                    <Form>
                                        <Input name="content" label="Write your post" type="textarea" rows={5} placeholder="Start writing..." />
                                        <Select name="TopicId" label="Topic">
                                            <option value="">Select a Topic</option>
                                            {errorTopData ?
                                                <option disabled>Error loading topics</option> :
                                                isFetchingTopData ?
                                                    <option disabled>Loading...</option> :
                                                    isSuccessTopData ?
                                                        <>
                                                            {topData.data.map((top, index) => {
                                                                return <option value={top.id} key={index}>{top?.title}</option>
                                                            })}
                                                        </> :
                                                        null
                                            }
                                        </Select>
                                        <div className="btn-container">
                                            <Button type="submit" loading={isFetchingTopData || isCreatingPos} disabled={!dirty}>Create Post</Button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                        <p className="note">
                            <Link to="/admin/posts/view" className="clickable"><FaEye /> View Posts</Link>
                        </p>
                    </Col>
                </Row>
            </Container >
        </Layout >
    )
}

export default AdminAddPost;

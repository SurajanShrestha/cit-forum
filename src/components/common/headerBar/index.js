import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { FaPencilAlt } from 'react-icons/fa';
import { Formik, Form } from 'formik';
import { http } from '../../../services/httpHelper';
import { getUser } from '../../../storage';
import { successToast, failureToast } from '../Toast';
import { editUserNameValidationSchema } from '../../../validations/editUser.validation';
import Input from '../Input';
import Button from '../Button';

function HeaderBar({
    userId = '',
    userName,
    userEmail,
    userAvatar,
    userRole = null,
    avatarWidth,
    editable = false,
    updateUser = false,
    updateUserRoute = '',
    title,
    categoryId,
    categoryType,
    totalTopics,
    totalPosts,
    noPosts = false
}) {
    const history = useHistory();
    const queryClient = useQueryClient();
    const [showEditNameField, setShowEditNameField] = useState(false);

    const { mutate: editUserName, data: editedUserData, error: editUserNameError, isLoading: editingUserName, isSuccess: isEditUserNameSuccess } = useMutation((payload) => {
        return http().patch(`/users/${userId}`, payload);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('myProfile');
        }
    }
    );

    const editNameInitialValues = {
        name: userName || ''
    };

    useEffect(() => {
        if (editUserNameError) {
            failureToast(editUserNameError?.response?.data?.message || "Error");
        }
        if (isEditUserNameSuccess) {
            successToast('Successfully edited your name');
            setShowEditNameField(false);
            // Change name in session storage too
            const newSessionUserData = {
                ...getUser(),
                name: editedUserData?.data?.user?.name
            };
            sessionStorage.setItem('cdUser', JSON.stringify(newSessionUserData));
            /* 
            Reloading because there is no way to refresh the navbar only.
            If we refresh using "userData" state in navbar in useEffect's dependency array it will run
            infinite times. Therfore, we are manually refreshing.
            */
            window.location.reload(true);
        }
    }, [editUserNameError, isEditUserNameSuccess]);

    const handleEditUserName = (values) => {
        editUserName(values);
    }

    return (
        <div className="headerBar lightGrayBg px-3">
            <Row>
                {
                    userName ?
                        <Col xs={9} className="d-flex align-items-center">
                            <img src={userAvatar} width={avatarWidth} alt="User Avatar" />
                            <div className="d-flex flex-column px-2">
                                {
                                    editable ?
                                        showEditNameField ?
                                            <div className="single-form mx-0">
                                                <Formik
                                                    initialValues={editNameInitialValues}
                                                    validationSchema={editUserNameValidationSchema}
                                                    onSubmit={handleEditUserName}
                                                >
                                                    {() => {
                                                        return (
                                                            <Form className="d-flex">
                                                                <Input name="name" label="Edit your name" type="text" />
                                                                <div className="btn-container ps-2">
                                                                    <Button type="submit" loading={editingUserName}>Done</Button>
                                                                    <Button className="ms-2" type="button" variant="secondary" onClick={() => setShowEditNameField(false)} >Cancel</Button>
                                                                </div>
                                                            </Form>
                                                        )
                                                    }}
                                                </Formik>
                                            </div> :
                                            <p className="f-xl">
                                                {userName}
                                                <span className="grayText f-sm clickable" title="Edit Name" onClick={() => setShowEditNameField(true)}>
                                                    <FaPencilAlt />
                                                </span>
                                            </p> :
                                        <p className="f-xl">
                                            {userName}
                                        </p>
                                }
                                {userEmail ? <small className="f-sm grayText">{userEmail}</small> : null}
                                {userRole ? <small className="f-sm greenText mt-2">{userRole}</small> : null}
                            </div>
                        </Col> :
                        null
                }
                {
                    title ?
                        <Col xs={!totalTopics && !totalPosts ? 12 : 9}>
                            <p className="f-xl">{title}</p>
                            {categoryType ?
                                categoryId ?
                                    <Link to={`/categoryTopics/${categoryId}`}>
                                        <small className="greenText">{categoryType}</small>
                                    </Link> :
                                    <small className="greenText">{categoryType}</small> :
                                null
                            }
                        </Col> :
                        null
                }
                <Col xs={3} className="d-flex justify-content-end">
                    <div className="ms-3 d-flex flex-column justify-content-center">
                        {
                            totalTopics ?
                                <>
                                    <p>{totalTopics}</p>
                                    <small className="grayText">Topics</small>
                                </> :
                                null
                        }
                    </div>
                    <div className="ms-3 d-flex flex-column justify-content-center">
                        {noPosts ?
                            null :
                            totalPosts ?
                                <>
                                    <p>{totalPosts}</p>
                                    <small className="grayText">Posts</small>
                                </> :
                                null
                        }
                        {updateUser ?
                            <div className='f-sm mt-2'>
                                <Button type="submit" onClick={() => history.push(updateUserRoute)}>Edit profile</Button>
                            </div> :
                            null
                        }
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default HeaderBar;

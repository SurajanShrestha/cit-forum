import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { Formik, Form } from 'formik';
import { http } from '../../../services/httpHelper';
import { successToast, failureToast } from '../Toast';
import { getUser } from '../../../storage';
import Button from '../Button';
import Input from '../Input';
import Popup from '../Popup';
import { createReplyValidationSchema } from '../../../validations/createReply.validation';

const initialValues = {
    content: "",
};

function Reply({ id, postId, replyToId, userName, userId, userAvatar, postedDate, answer, /* totalLikes */ }) {
    const formikBag = useRef();
    const queryClient = useQueryClient();
    const [showReplyField, setShowReplyField] = useState(false);
    const [repliedToId, setRepliedToId] = useState('');
    const [fetchRepliedToUserData, setFetchRepliedToUserData] = useState(false);
    const [showEditField, setShowEditField] = useState(false);

    const [editReplyInitialValues, setEditReplyInitialValues] = useState(initialValues);

    // For Popup
    const [show, setShow] = useState(false);
    const [yesDelete, setYesDelete] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSetYes = () => setYesDelete(true);

    const { data: repliedToData } = useQuery(['repliedTo', { repliedToId }], () => {
        return http().get(`/replies/${repliedToId}`);
    }, {
        enabled: fetchRepliedToUserData
    });

    const { mutate: createReplyTo, error: replyToError, isLoading: isReplyingTo, isSuccess: isSuccessReplyTo } = useMutation((payload) => {
        return http().post('/replies', payload);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('reply');
            queryClient.invalidateQueries('posts');
        }
    }
    );

    const { mutate: updateReply, error: updateError, isLoading: isUpdating, isSuccess: isUpdateSuccess } = useMutation((payload) => {
        return http().patch(`/replies/${id}`, payload);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('reply');
        }
    });

    const { mutate: deleteReply, isError: isErrorDeleteReply, isLoading: isDeletingReply, isSuccess: isSuccessDeleteReply } = useMutation((id) => {
        return http().delete(`/replies/${id}`);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('reply');
            queryClient.invalidateQueries('posts');
        }
    }
    );

    useEffect(() => {
        if (replyToId) {
            setFetchRepliedToUserData(true);
            setRepliedToId(replyToId);
        } else {
            setFetchRepliedToUserData(false);
        }
    }, []);

    useEffect(() => {
        if (replyToError) {
            failureToast("Error replying");
        }
        if (isSuccessReplyTo) {
            successToast("Successfully Replied");
            formikBag.current?.resetForm();
            setShowReplyField(false);
        }
    }, [replyToError, isSuccessReplyTo]);

    useEffect(() => {
        if (showEditField) {
            setEditReplyInitialValues({
                ...initialValues,
                content: answer
            });
        }
    }, [showEditField]);

    useEffect(() => {
        if (isUpdateSuccess) {
            successToast("Reply successfully updated.");
            setShowEditField(false);
        }
        if (updateError) {
            failureToast(updateError?.response?.data?.message || "Error updating post");
        }
    }, [updateError, isUpdateSuccess]);

    useEffect(() => {
        if (yesDelete) {
            deleteReply(id);
            setYesDelete(false);
        }
    }, [yesDelete]);

    useEffect(() => {
        if (isSuccessDeleteReply) {
            successToast('Reply successfully deleted');
        }
        if (isErrorDeleteReply) {
            failureToast('Failed to delete reply');
        }
    }, [isErrorDeleteReply, isSuccessDeleteReply]);

    const handleCreateReplyTo = () => {
        if (getUser()) {
            setShowReplyField(true);
        } else {
            failureToast('You must log in to write a Reply');
            setShowReplyField(false);
        }
    };

    const handleReplyToSubmit = (values) => {
        if (getUser()) {
            createReplyTo({
                ...values,
                UserId: getUser().id,
                PostId: postId,
                replyToId: id,
            });
        }
    };

    const handleEditReply = () => {
        if (getUser()) {
            setShowEditField(true);
        } else {
            failureToast('You must log in to edit a Reply');
            setShowEditField(false);
        }
    };

    const handleEditReplySubmit = (values) => {
        if (getUser()) {
            updateReply(values);
        }
    };

    return (
        <div className="post">
            <Popup
                show={show}
                handleClose={handleClose}
                handleSetYes={handleSetYes}
                heading="Delete Reply"
                body="Are you sure you want to delete this Reply?"
            />
            <div className="userAvatar">
                <Link to={`/user/${userId}`}>
                    <img src={userAvatar} alt="User Avatar" />
                </Link>
            </div>
            <div className="postContent">
                <div className="userDetails">
                    <Link to={`/user/${userId}`}>
                        <p className="userName">{userName}</p>
                    </Link>
                    <div className="date">
                        <FaRegCalendarCheck className='f-sm' />
                        <small className="f-xs ms-1">{postedDate}</small>
                    </div>
                </div>
                {
                    showEditField ?
                        <div className="single-form mb-3">
                            <Formik
                                initialValues={editReplyInitialValues}
                                validationSchema={createReplyValidationSchema}
                                onSubmit={handleEditReplySubmit}
                                enableReinitialize
                            >
                                {() => {
                                    return (
                                        <Form>
                                            <Input name="content" label="Edit your Reply" type="textarea" rows={5} placeholder="Your reply..." />
                                            <div className="btn-container" style={{ justifyContent: 'right', paddingTop: 5 }}>
                                                <Button type="submit" loading={isUpdating}>Update Reply</Button>
                                                <Button className="ms-3" type="button" variant="secondary" onClick={() => setShowEditField(false)} >Cancel</Button>
                                            </div>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div> :
                        repliedToData ?
                            <article className="userAnswer">
                                <Link to="/"><span className="replyTo">{repliedToData?.data?.User?.name}</span></Link>
                                {answer}
                            </article> :
                            <article className="userAnswer">
                                {answer}
                            </article>
                }
                <div className="postActions">
                    {!showReplyField && !showEditField ?
                        <div className='text-end mb-2 action'>
                            <Button type="button" onClick={handleCreateReplyTo}>Reply</Button>
                        </div> :
                        null
                    }
                    {(getUser()?.id === parseInt(userId)) && !showEditField && !showReplyField ?
                        <div className='text-end mb-2 action'>
                            <Button type="button" variant='secondary' onClick={handleEditReply}>Edit</Button>
                        </div> :
                        null
                    }
                    {(getUser()?.id === parseInt(userId)) ?
                        <div className='text-end mb-2 action'>
                            <Button type="button" variant='danger' loading={isDeletingReply} onClick={handleShow}>Delete</Button>
                        </div> :
                        null
                    }
                </div>
                {showReplyField &&
                    <div className="single-form mb-3">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={createReplyValidationSchema}
                            onSubmit={handleReplyToSubmit}
                            enableReinitialize
                            innerRef={formikBag}
                        >
                            {() => {
                                return (
                                    <Form>
                                        <Input name="content" label="Write your Reply" type="textarea" rows={5} placeholder="Your reply..." />
                                        <div className="btn-container" style={{ justifyContent: 'right', paddingTop: 5 }}>
                                            <Button type="submit" loading={isReplyingTo} >Reply</Button>
                                            <Button className="ms-3" type="button" variant="secondary" onClick={() => setShowReplyField(false)} >Cancel</Button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                }
            </div>
        </div>
    );
}

export default Reply;

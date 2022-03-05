import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import {
    FaRegCalendarCheck,
    FaAngleUp,
    FaAngleDown,
} from 'react-icons/fa';
import { Formik, Form } from 'formik';
import { http } from '../../../services/httpHelper';
import { successToast, failureToast } from '../Toast';
import Reply from './Reply';
import { getUser } from '../../../storage';
import Button from '../Button';
import Input from '../Input';
import Popup from '../Popup';
import { createReplyValidationSchema } from '../../../validations/createReply.validation';
import { createPostValidationSchema } from '../../../validations/createPost.validation';

const initialValues = {
    content: "",
};

const postInitialValues = {
    content: "",
}

function Post({ id, userId, userName, userAvatar, postedDate, answer, /* totalLikes, */ totalReplies }) {
    const formikBag = useRef();
    const queryClient = useQueryClient();
    const [openReplies, setOpenReplies] = useState(false);
    const [showReplyField, setShowReplyField] = useState(false);
    const [showEditPostField, setShowEditPostField] = useState(false);

    const [editPostInitialValues, setEditPostInitialValues] = useState(postInitialValues);

    // For Popup
    const [show, setShow] = useState(false);
    const [yesDelete, setYesDelete] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSetYes = () => setYesDelete(true);

    const { data: replyData, error: errorReplyData } = useQuery(['reply', { id }], () => {
        return http().get(`/replies/byPostId?PostId=${id}`);
    });

    const { mutate: createReply, error: replyError, isLoading: isReplying, isSuccess: isSuccessReply } = useMutation((payload) => {
        return http().post('/replies', payload);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('reply');
            queryClient.invalidateQueries('posts');
        }
    }
    );

    const { mutate: updatePost, error: updateError, isLoading: isUpdating, isSuccess: isUpdateSuccess } = useMutation((payload) => {
        return http().patch(`/posts/${id}`, payload);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        }
    });

    const { mutate: deletePost, isError: isErrorDeletePost, isLoading: isDeletingPost, isSuccess: isSuccessDeletePost } = useMutation((id) => {
        return http().delete(`/posts/${id}`);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        }
    }
    );

    useEffect(() => {
        if (errorReplyData) {
            failureToast(errorReplyData?.response?.data?.message || "Error");
        }
    }, [errorReplyData]);

    useEffect(() => {
        if (replyError) {
            failureToast("Error replying");
        }
        if (isSuccessReply) {
            successToast("Successfully Replied");
            formikBag.current?.resetForm();
            setShowReplyField(false);
        }
    }, [replyError, isSuccessReply]);

    useEffect(() => {
        if (showEditPostField) {
            setEditPostInitialValues({
                ...postInitialValues,
                content: answer
            });
        }
    }, [showEditPostField]);

    useEffect(() => {
        if (isUpdateSuccess) {
            successToast("Post successfully updated.");
            setShowEditPostField(false);
        }
        if (updateError) {
            failureToast(updateError?.response?.data?.message || "Error updating post");
        }
    }, [updateError, isUpdateSuccess]);

    useEffect(() => {
        if (yesDelete) {
            deletePost(id);
            setYesDelete(false);
        }
    }, [yesDelete]);

    useEffect(() => {
        if (isSuccessDeletePost) {
            successToast('Post successfully deleted');
        }
        if (isErrorDeletePost) {
            failureToast('Failed to delete post');
        }
    }, [isErrorDeletePost, isSuccessDeletePost]);


    const handleCreateReply = () => {
        if (getUser()) {
            setShowReplyField(true);
        } else {
            failureToast('You must log in to write a Reply');
            setShowReplyField(false);
        }
    };

    // Replying to a Post, not replying to a reply. So, we will not have a replyToId
    const handleReplySubmit = (values) => {
        if (getUser()) {
            createReply({
                ...values,
                UserId: getUser().id,
                PostId: id,
            });
        }
    };

    const handleEditPost = () => {
        if (getUser()) {
            setShowEditPostField(true);
        } else {
            failureToast('You must log in to edit a Post');
            setShowEditPostField(false);
        }
    };

    const handlePostSubmit = (values) => {
        if (getUser()) {
            updatePost(values);
        }
    };

    return (
        <div className="post">
            <Popup
                show={show}
                handleClose={handleClose}
                handleSetYes={handleSetYes}
                heading="Delete Post"
                body="Are you sure you want to delete this Post?"
            />
            <div className="userAvatar">
                <Link to="/">
                    <img src={userAvatar} alt="User Avatar" />
                </Link>
            </div>
            <div className="postContent">
                <div className="userDetails">
                    <Link to="/">
                        <p className="userName">{userName}</p>
                    </Link>
                    <div className="date">
                        <FaRegCalendarCheck className='f-sm grayText' />
                        <small className="f-xs ms-1">{postedDate}</small>
                    </div>
                </div>
                {showEditPostField ?
                    <div className="single-form mb-3">
                        <Formik
                            initialValues={editPostInitialValues}
                            validationSchema={createPostValidationSchema}
                            onSubmit={handlePostSubmit}
                            enableReinitialize
                        >
                            {() => {
                                return (
                                    <Form>
                                        <Input name="content" label="Edit your Post" type="textarea" rows={5} placeholder="Start writing..." />
                                        <div className="btn-container" style={{ justifyContent: 'right', paddingTop: 5 }}>
                                            <Button type="submit" loading={isUpdating}>Update Post</Button>
                                            <Button className="ms-3" type="button" variant="secondary" onClick={() => setShowEditPostField(false)} >Cancel</Button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div> :
                    <article className="userAnswer">
                        {answer}
                    </article>
                }
                <div className="postActions">
                    {
                        totalReplies === 0 ?
                            null :
                            <div className="action">
                                <small className="view-replies f-sm" title="View Replies" onClick={() => setOpenReplies(!openReplies)}>{totalReplies || "0"} Replies&nbsp;
                                    {openReplies ?
                                        <FaAngleUp /> :
                                        <FaAngleDown />
                                    }
                                </small>
                            </div>
                    }
                    {!showReplyField && !showEditPostField ?
                        <div className='text-end mb-2 action'>
                            <Button type="button" onClick={handleCreateReply}>Reply</Button>
                        </div> :
                        null
                    }
                    {(getUser()?.id === parseInt(userId)) && !showEditPostField && !showReplyField ?
                        <div className='text-end mb-2 action'>
                            <Button type="button" variant='secondary' onClick={handleEditPost}>Edit</Button>
                        </div> :
                        null
                    }
                    {(getUser()?.id === parseInt(userId)) ?
                        <div className='text-end mb-2 action'>
                            <Button type="button" variant='danger' loading={isDeletingPost} onClick={handleShow}>Delete</Button>
                        </div> :
                        null
                    }
                </div>
                {showReplyField &&
                    <div className="single-form mb-3">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={createReplyValidationSchema}
                            onSubmit={handleReplySubmit}
                            enableReinitialize
                            innerRef={formikBag}
                        >
                            {() => {
                                return (
                                    <Form>
                                        <Input name="content" label="Write your Reply" type="textarea" rows={5} placeholder="Your reply..." />
                                        <div className="btn-container" style={{ justifyContent: 'right', paddingTop: 5 }}>
                                            <Button type="submit" loading={isReplying}>Reply</Button>
                                            <Button className="ms-3" type="button" variant="secondary" onClick={() => setShowReplyField(false)} >Cancel</Button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                }
                {
                    openReplies ?
                        replyData?.data && replyData?.data.length ?
                            replyData?.data.map((reply, index) => {
                                return (
                                    <Reply
                                        id={reply?.id}
                                        postId={id}
                                        replyToId={reply?.replyToId}
                                        userName={reply?.User?.name}
                                        userId={reply?.User?.id}
                                        userAvatar={process.env.PUBLIC_URL + "/images/userAvatars/uAv-02.jpg"}
                                        postedDate={reply?.createdAt.slice(0, 10)}
                                        answer={reply?.content}
                                        // totalLikes={reply?.likes}
                                        key={index}
                                    />
                                );
                            }) :
                            null :
                        null
                }
            </div>
        </div>
    );
}

export default Post;

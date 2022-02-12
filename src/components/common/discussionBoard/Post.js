import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { Formik, Form } from 'formik';
import { http } from '../../../services/httpHelper';
import { successToast, failureToast } from '../Toast';
import Reply from './Reply';
import { getUser } from '../../../storage';
import Button from '../Button';
import Input from '../Input';
import { createReplyValidationSchema } from '../../../validations/createReply.validation';

const initialValues = {
    content: "",
};

function Post({ id, userName, userAvatar, postedDate, answer, /* totalLikes, */ totalReplies }) {
    const formikBag = useRef();
    const queryClient = useQueryClient();
    const [openReplies, setOpenReplies] = useState(false);
    const [showReplyField, setShowReplyField] = useState(false);

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

    return (
        <div className="post">
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
                        <i className="f-sm fa fa-calendar-check-o" aria-hidden="true"></i>
                        <small className="f-xs">{postedDate}</small>
                    </div>
                </div>
                <article className="userAnswer">
                    {answer}
                </article>
                <div className="postActions">
                    {
                        totalReplies === 0 ?
                            null :
                            <div className="action">
                                <small className="view-replies f-sm" title="View Replies" onClick={() => setOpenReplies(!openReplies)}>{totalReplies || "0"} Replies&nbsp;<i class={openReplies ? "fa fa-angle-up" : "fa fa-angle-down"} aria-hidden="true"></i></small>
                            </div>
                    }
                    {/* <div className="action">
                        <i className="fa fa-heart-o like" aria-hidden="true" title="Like"></i>
                        {totalLikes ? <small className="f-xs grayText">{totalLikes}</small> : null}
                    </div> */}
                    {!showReplyField &&
                        <div className='text-end mb-2 action'>
                            <Button type="button" onClick={handleCreateReply}>Reply</Button>
                        </div>
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

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { Formik, Form } from 'formik';
import { http } from '../../../services/httpHelper';
import { successToast, failureToast } from '../Toast';
import { getUser } from '../../../storage';
import Button from '../Button';
import Input from '../Input';
import { createReplyValidationSchema } from '../../../validations/createReply.validation';

const initialValues = {
    content: "",
};

function Reply({ id, postId, replyToId, userName, userId, userAvatar, postedDate, answer, totalLikes }) {
    const formikBag = useRef();
    const queryClient = useQueryClient();
    const [showReplyField, setShowReplyField] = useState(false);
    const [repliedToId, setRepliedToId] = useState('');
    const [fetchRepliedToUserData, setFetchRepliedToUserData] = useState(false);

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

    useEffect(() => {
        if (replyToId) {
            setFetchRepliedToUserData(true);
            setRepliedToId(replyToId);
        }else{
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

    return (
        <div className="post">
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
                        <i className="f-sm fa fa-calendar-check-o" aria-hidden="true"></i>
                        <small className="f-xs">{postedDate}</small>
                    </div>
                </div>
                {
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
                    <div className="action">
                        <i className="fa fa-heart-o like" aria-hidden="true" title="Like"></i>
                        {totalLikes ? <small className="f-xs grayText">{totalLikes}</small> : null}
                    </div>
                    {!showReplyField &&
                        <div className='text-end mb-2 action'>
                            <Button type="button" onClick={handleCreateReplyTo}>Reply</Button>
                        </div>
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

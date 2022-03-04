import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { Row, Col, Spinner } from 'react-bootstrap';
import { http } from '../../../services/httpHelper';
import { successToast, failureToast } from '../Toast';
import Popup from '../Popup';
import { getUser } from '../../../storage';

function ListItem({
    id,
    topic,
    createdDate,
    posts,
    author,
    authorId,
    index,
    deletable,
    editable
}) {
    const history = useHistory();
    const queryClient = useQueryClient();

    // For Popup
    const [show, setShow] = useState(false);
    const [yesDelete, setYesDelete] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSetYes = () => setYesDelete(true);

    const { mutate: deleteTopic, error: errorDeleteTopic, isLoading: isDeletingTopic, isSuccess: isSuccessDeleteTopic } = useMutation((id) => {
        return http().delete(`/topics/${id}`);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('myProfile');
        }
    }
    );

    const handleDeleteTopic = () => {
        if (getUser()) {
            if (yesDelete) {
                deleteTopic(id);
            }
        } else {
            failureToast("Please Login first");
        }
    };

    useEffect(() => {
        if (errorDeleteTopic) {
            failureToast("Error deleting topic");
        }
        if (isSuccessDeleteTopic) {
            successToast("Successfully deleted topic");
        }
    }, [errorDeleteTopic, isSuccessDeleteTopic]);

    useEffect(() => {
        if (yesDelete) {
            handleDeleteTopic();
        }
    }, [yesDelete]);

    return (
        <div className="px-3">
            <Popup show={show} handleClose={handleClose} handleSetYes={handleSetYes} heading="Delete Topic" body="Are you sure you want to delete this topic?" />
            {/* Changing the background color of each ListItem based on if the ListItem's index is even or not */}
            <Row className={(index % 2 === 0) ? `py-1 mb-2` : `lightGrayBg py-1 mb-2`}>
                <Col xs={6}>
                    <Link to={`/topic/${id}`} className="greenText f-sm">{topic}</Link>
                    <div className="d-flex align-items-center">
                        <i className="f-sm grayText fa fa-calendar-check-o" aria-hidden="true"></i>
                        <small className="f-xs grayText">&emsp;{createdDate}</small>
                        {deletable ?
                            isDeletingTopic ?
                                <Spinner animation="border" size="sm" /> :
                                <i
                                    onClick={handleShow}
                                    className="f-md grayText fa fa-trash-o ms-2 clickable"
                                    aria-hidden="true"
                                    title="Delete"
                                >
                                </i> :
                            null
                        }
                        {editable ?
                            <i
                                onClick={() => history.push(`/updateTopic/${id}`)}
                                className="f-md grayText fa fa-pencil ms-2 clickable"
                                aria-hidden="true"
                                title="Edit"
                            >
                            </i> :
                            null
                        }
                    </div>
                </Col>
                <Col className="f-sm d-flex align-items-start" xs={2}>{posts}</Col>
                <Col className="d-flex align-items-start" xs={4}>
                    <Link to={`/user/${authorId}`}><img src={process.env.PUBLIC_URL + "/images/userAvatars/uAv-01.jpg"} alt="User Avatar" width={30} /></Link>
                    <Link to={`/user/${authorId}`} className="greenText f-sm ms-2">{author}</Link>
                </Col>
            </Row>
        </div>
    );
}

export default ListItem;

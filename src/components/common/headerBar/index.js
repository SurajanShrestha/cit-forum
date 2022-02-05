import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HeaderBar({ userName, userEmail, userAvatar, avatarWidth, editable, title, categoryType, totalTopics, totalPosts, noPosts = false }) {
    return (
        <div className="headerBar lightGrayBg px-3">
            <Row>
                {
                    userName ?
                        <Col xs={9} className="d-flex align-items-center">
                            {
                                editable ?
                                    <div className="change-avatar">
                                        <img src={userAvatar} width={avatarWidth} alt="User Avatar" />
                                        <span className="overlay" title="Edit Avatar"><i class="fa fa-camera" aria-hidden="true"></i></span>
                                    </div> :
                                    <img src={userAvatar} width={avatarWidth} alt="User Avatar" />
                            }
                            <div className="d-flex flex-column px-2">
                                {
                                    editable ?
                                        <p className="f-xl">
                                            {userName}
                                            <span className="grayText f-sm clickable" title="Edit Name"><i class="fa fa-pencil" aria-hidden="true"></i></span>
                                        </p> :
                                        <p className="f-xl">
                                            {userName}
                                        </p>
                                }
                                {userEmail ? <small className="f-sm grayText">{userEmail}</small> : null}
                            </div>
                        </Col> :
                        null
                }
                {
                    title ?
                        <Col xs={!totalTopics && !totalPosts ? 12 : 9}>
                            <p className="f-xl">{title}</p>
                            {categoryType ? <Link to="/categoryTopics"><small className="greenText">{categoryType}</small></Link> : null}
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
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default HeaderBar;

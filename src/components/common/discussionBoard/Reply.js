import { Link } from 'react-router-dom';

function Reply({ userName, userAvatar, postedDate, answer, totalLikes, replyTo }) {
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
                {
                    replyTo ?
                    <article className="userAnswer">
                        <Link to="/"><span className="replyTo">{replyTo}</span></Link>
                        {answer}
                    </article> :
                    <article className="userAnswer">
                        {answer}
                    </article>
                }
                <div className="postActions">
                    <div className="action">
                        <i className="fa fa-heart-o like" aria-hidden="true" title="Like"></i>
                        { totalLikes ? <small className="f-xs grayText">{totalLikes}</small> : null }
                    </div>
                    <div className="action">
                        <i className="fa fa-commenting-o reply" aria-hidden="true" title="Reply"></i>
                        { totalLikes ? <small className="f-xs grayText">{totalLikes}</small> : null }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reply;

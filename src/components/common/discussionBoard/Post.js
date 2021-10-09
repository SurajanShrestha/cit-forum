import { Link } from 'react-router-dom';

function Post({ userName, postedDate, answer, totalLikes, totalShares, totalReplies }) {
    return (
        <div className="post">
            <div className="userAvatar">
                <Link to="/">
                    <img src={process.env.PUBLIC_URL+"/images/userAvatars/uAv-01.jpg"} />
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
                    <div className="action">
                        <small className="view-replies f-sm" title="View Replies">Replies&nbsp;<i class="fa fa-angle-down" aria-hidden="true"></i></small>
                    </div>
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

export default Post;

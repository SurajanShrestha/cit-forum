import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reply from './Reply';

function Post({ userName, userAvatar, postedDate, answer, totalLikes, totalReplies }) {
    const [openReplies, setOpenReplies]=useState(false);

    return (
        <div className="post">
            <div className="userAvatar">
                <Link to="/">
                    <img src={userAvatar} />
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
                        totalReplies===0 ?
                        null :
                        <div className="action">
                            <small className="view-replies f-sm" title="View Replies" onClick={()=>setOpenReplies(!openReplies)}>Replies&nbsp;<i class={ openReplies ? "fa fa-angle-up" : "fa fa-angle-down" } aria-hidden="true"></i></small>
                        </div>
                    }
                    <div className="action">
                        <i className="fa fa-heart-o like" aria-hidden="true" title="Like"></i>
                        { totalLikes ? <small className="f-xs grayText">{totalLikes}</small> : null }
                    </div>
                    <div className="action">
                        <i className="fa fa-commenting-o reply" aria-hidden="true" title="Reply"></i>
                        { totalReplies ? <small className="f-xs grayText">{totalReplies}</small> : null }
                    </div>
                </div>
                {
                    openReplies ?
                    <>
                        <Reply userName="Shyam Adhikari" userAvatar={process.env.PUBLIC_URL+"/images/userAvatars/uAv-02.jpg"} postedDate="2021-10-10" answer="I've been dropping mmr for a while and I lose a lot of normal games too..Is the community just a bunch of hardenes veterans that makes the game more difficult?Maybe I'm going downhill..." totalLikes={2} />
                        <Reply userName="Jon Snow" userAvatar={process.env.PUBLIC_URL+"/images/userAvatars/uAv-03.jpg"} postedDate="2021-10-10" answer="mmr is actually easier now. divine use to be harder it is now the ancient level of a few years ago. likewise ancient is the old legend. You get 30 per game where as before it was 25 or less." replyTo="Shyam Adhikari" />
                    </> :
                    null
                }
            </div>
        </div>
    );
}

export default Post;

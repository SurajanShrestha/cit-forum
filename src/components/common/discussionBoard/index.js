import Post from './Post';

function DiscussionBoard({ postsData }) {
    return (
        <div className="discussion px-3">
            {console.log(postsData)}
            <div>
                {postsData && postsData.length ?
                    postsData.map((post, index) => {
                        return (
                            <Post
                                id={post?.id}
                                userName={post?.User?.name}
                                userAvatar={process.env.PUBLIC_URL + "/images/userAvatars/uAv-01.jpg"}
                                postedDate={post?.createdAt.slice(0, 10)}
                                answer={post?.content}
                                totalLikes={post?.likes}
                                totalReplies={post?.Replies.length}
                                key={index}
                            />
                        );
                    }) :
                    <p className="f-sm">There are no posts. You can always create one.</p>
                }
                {/* <Post userName="Ram Chaudhary" userAvatar={process.env.PUBLIC_URL + "/images/userAvatars/uAv-01.jpg"} postedDate="2021-10-09" answer={`Reading how you reply, I can see why your behaviour score is a measly 6k. Once your smurf account gets to "higher" (probably 1k) mmr and people start stomping you again, your BS will fall back to 6k again. that's just you, don't blame valve.`} totalLikes={15} totalReplies={2} />
                <Post userName="Hari Karki" userAvatar={process.env.PUBLIC_URL + "/images/userAvatars/uAv-01.jpg"} postedDate="2021-10-09" answer={`xd nah, i was 2 years without playing and lost 2k mmr from 4.3k to 2.2k feeding and trolling but now i'm determined to play tryhard and i found is literally hell and impossible to get out of the bs, believe me if you were in mi situation you will do the same like me, so im thinking that valve flagged my main account into a shadow pool or something like that, im very tryhard when i play ranked, in this smurf i have 10-9k bs easy, even if i get reported 4 times in 15 matches my bs keep incresing... valve is a joke, they are trying to do a BEAVIOR MATCHMAKING, instead focus in your skill ability, that's why there are too many smurfs, i bet all those are in similar situation like me...Valve you can suck my dick and gaben grab my balls`} /> */}
            </div>
        </div>
    );
}

export default DiscussionBoard;

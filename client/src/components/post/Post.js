import './post.css';
import { MoreVert } from '@material-ui/icons';

import { Users } from '../../tmpData';

const Post = ({ post }) => {
    const user = Users.filter(u => u.id === post.userId).shift();
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postProfileImg" src={user.profilePicture} alt="postProfileImg"/>
                        <span className="postUserName">{ user.username }</span>
                        <span className="postDate">{ post.date }</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="posText">{ post?.desc }</span>
                    <img className="postImg" src={ post?.photo } alt=""/>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="/assets/like.png" alt=""/>
                        <img className="likeIcon" src="/assets/heart.png" alt=""/>
                        <span className="likeCounter">{ post.like } people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{ post.comment } comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;

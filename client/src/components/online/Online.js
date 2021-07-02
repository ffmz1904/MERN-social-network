import './online.css';

const Online = ({ user }) => {
    return (
        <li className="online">
            <div className="onlineProfileImgContainer">
                <img className="onlineProfileImg" src={user.profilePicture} alt="rightbarProfileImg"/>
                <span className="onlineBadge"/>
            </div>
            <span className="onlineUserName">{ user.username }</span>
        </li>
    );
};

export default Online;

import Online from "../online/Online";
import './rightbar.css';

import { Users } from '../../tmpData';

const Rightbar = () => {
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="/assets/gift.png" alt="birthdayImg"/>
                    <span className="birthdayText"><b>Pola Foster</b> and <b>3 other friends</b> have a birthday today!</span>
                </div>
                <img className="rightbarAd" src="/assets/ad.png" alt="rightbarAd"/>
                <h4 className="rightbarTitle">Friends online:</h4>
                <ul className="rightbarFriendList">
                    { Users.map(u => <Online key={u.id} user={u} />) }
                </ul>
            </div>
        </div>
    );
};

export default Rightbar;

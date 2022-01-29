import React from "react";
import "./profile.css";
import AddIcon from "@mui/icons-material/Add";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { useSelector } from "react-redux";
import { selectUser } from "../userSlice";

function Profile() {
  const user = useSelector(selectUser);
  return (
    <div className="left-container">
      <div className="top-block">
        <div className="bg-img"></div>

        <div className="name_photo">
          <div>{user.displayName}</div>
          <div className="add_photo">Add a photo</div>
        </div>

        <div className="connections-container">
          <div className="connections">
            <div className="conn-text-light">Connections</div>
            <div className="conn-text-dark">Grow your network</div>
          </div>
          <div className="conn-icon">
            <PersonAddAlt1Icon fontSize="medium" />
          </div>
        </div>

        <div className="premium_trial">
          <div className="premium-text-light">
            Access exclusive tools & insights
          </div>
          <div className="premium-text-dark">Try premium for free</div>
        </div>

        <div className="my-items">
          <div className="items-icon">
            <TurnedInIcon fontSize="small" />
          </div>
          <div className="items-text">My items</div>
        </div>
      </div>

      <div className="bottom-block">
        <div className="groups">Groups</div>

        <div className="events">
          <div className="events-text">Events</div>
          <div className="events-icon">{/*<AddIcon />*/}</div>
        </div>

        <div className="Followed Hashtags">Followed Hashtags</div>

        <div className="discover-more">Discover more</div>
      </div>
    </div>
  );
}

export default Profile;

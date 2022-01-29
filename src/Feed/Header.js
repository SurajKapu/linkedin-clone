import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import ChatBubbleSharpIcon from "@mui/icons-material/ChatBubbleSharp";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../userSlice";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Header() {
  const user = useSelector(selectUser);

  return (
    <div className="feed_container">
      <div className="feed__body">
        <div className="feed__header">
          <img
            className="feed__logo"
            src="https://sguru.org/wp-content/uploads/2018/02/linkedin-logo.png"
            alt="logo"
          />

          <div className="search_container">
            <SearchIcon fontSize="medium" className="search_icon" />
            <input type="text" placeholder="Search" className="search_input" />
          </div>

          <div className="header_right">
            <div className="icons">
              <HomeIcon fontSize="large" className="header__icon" />
              <PeopleAltIcon fontSize="large" className="header__icon" />
              <BusinessCenterIcon fontSize="large" className="header__icon" />
              <ChatBubbleSharpIcon fontSize="large" className="header__icon" />
              <NotificationsSharpIcon
                fontSize="large"
                className="header__icon"
              />
            </div>
            <img alt={user.displayName} className="userImg" />

            <button
              onClick={() => {
                signOut(auth);
              }}
              className="signOut"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

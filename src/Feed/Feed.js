import React from "react";
import "./feed.css";
import Feed_main from "./Feed_main";
import Header from "./Header";
import News from "./News";
import Profile from "./Profile";

function Feed() {
  return (
    <div className="feed_page">
      <Header />
      <div className="feed__body">
        <Profile className="profile" />
        <Feed_main className="feed_main" />
        <News className="news" />
      </div>
    </div>
  );
}

export default Feed;

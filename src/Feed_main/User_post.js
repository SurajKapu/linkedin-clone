import React from "react";
import "./User_post.css";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import EventIcon from "@mui/icons-material/Event";
import WebIcon from "@mui/icons-material/Web";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import User_input_modal from "./User_input_modal";
import { useState } from "react";

function User_post() {
  const [showModal, setshowModal] = useState(false);
  const [loading, setLoading] = useState(false)
  return (
    <>
    <div className="user_post_container">
      <div className="user_input" onClick={() => setshowModal(true)}>
        Start a post
      </div>
      <div className="user_media_container">
        <div className="user_media">
          <InsertPhotoRoundedIcon style={{ color: "#70b5f9" }} />
          <div className="user_media_desc">Photo</div>
        </div>

        <div className="user_media">
          <VideoLibraryIcon style={{ color: "#7fc15e" }} />
          <div className="user_media_desc">Video</div>
        </div>

        <div className="user_media">
          <EventIcon style={{ color: "#e7a33e" }} />
          <div className="user_media_desc">Event</div>
        </div>

        <div className="user_media">
          <WebIcon style={{ color: "#fc9295" }} />
          <div className="user_media_desc">Write article</div>
        </div> 
      </div>
      {showModal && <User_input_modal closeModal={setshowModal} loading={setLoading}/>}
    </div>
    {loading && <h5>Loading...</h5>}
    </>
  );
}

export default User_post;

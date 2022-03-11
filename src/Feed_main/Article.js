import React, { useState } from "react";
import "./article.css";
import { doc, deleteDoc } from "firebase/firestore";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { selectUser } from "../userSlice";

import db from "../firebase";
import Editpost_modal from "./Editpost_modal";

function Article({ props, id }) {
  const user = useSelector(selectUser);
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)

  const editPost = async () => {
    setShowOptions(!showOptions);
    setShowModal(true);
  };

  const deletePost = async () => {
    setLoading(true)
    await deleteDoc(doc(db, "users", "user", `${user.uid}`, id));
    setLoading(false)
    setShowOptions(!showOptions);
  };

  return (
    <>
      {showModal && (
        <Editpost_modal closeModal={setShowModal} props={props} id={id} loading={setLoading}/>
      )}
      {loading && <h5>Loading....</h5>}
      <div className="article">
        <div className="article_body">
          <div className="article_top">
            <div className="info">
              <AccountCircleIcon
                style={{ color: "grey", fontSize: "2.5rem" }}
              />
              <div className="name">
                <div>{props.userName}</div>
                <div>{props.date}</div>
              </div>
            </div>
            <div
              className="moreOptions"
              onClick={() => setShowOptions(!showOptions)}
            >
              <MoreVertIcon />
            </div>
          </div>

          {showOptions && (
            <div className="modify_post">
              <div className="edit_post" onClick={editPost}>
                Edit
              </div>
              <div className="delete_post" onClick={deletePost}>
                Delete
              </div>
            </div>
          )}
          <div className="article_middle">
            {props.userInput && (
              <p style={{ padding: "0.5em 1.5em" }}>{props.userInput}</p>
            )}
            <div className="uploaded_file">
              {props.image && <img src={props.image} alt="img" />}
              {props.videoLink && (
                <ReactPlayer
                  style={{ maxWidth: "100%" }}
                  url={props.videoLink}
                />
              )}
            </div>
          </div>
          <div className="article_bottom">
            <div className="reactions">
              <div className="article_icons"></div>
              <div className="reaction_count"></div>
            </div>
            <div className="reaction_icons">
              <div>
                <ThumbUpOutlinedIcon />
                Like
              </div>
              <div>
                <CommentOutlinedIcon />
                Comment
              </div>
              <div>
                <SendIcon />
                Send
              </div>
              <div>
                <ShareIcon />
                Share
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Article;

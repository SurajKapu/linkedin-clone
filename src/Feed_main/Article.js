import React from "react";
import "./article.css";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import ShareIcon from "@mui/icons-material/Share";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { selectUser } from "../userSlice";

function Article({ props }) {
  const user = useSelector(selectUser);

  return (
    <div className="article">
      <div className="article_body">
        <div className="article_top">
          <AccountCircleIcon style={{ color: "grey", fontSize: "2.5rem" }} />
          <div className="info">
            <div>{props.userName}</div>
            <div>{props.date}</div>
          </div>
        </div>
        <div className="article_middle">
          {props.userInput && (
            <p style={{ padding: "0.5em 1.5em" }}>{props.userInput}</p>
          )}
          <div className="uploaded_file">
            {props.image && <img src={props.image} alt="img" />}
            {props.videoLink && (
              <ReactPlayer style={{ maxWidth: "100%" }} url={props.videoLink} />
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
  );
}

export default Article;

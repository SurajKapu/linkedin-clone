import React from "react";
import "./user_input_modal.css";

import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useState } from "react";

import ReactPlayer from "react-player";

import { doc, updateDoc ,deleteField} from "firebase/firestore";
import db from "../firebase";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { useSelector } from "react-redux";
import { selectUser } from "../userSlice";

function Editpost_modal({ props, id, closeModal,loading }) {
  const [userInput, setUserInput] = useState("");
  const [image, setImage] = useState();
  const [videoLink, setVideoLink] = useState("");
  const [propVideoLink, setpropVideoLink] = useState(true);
  const [propImageLink, setpropImageLink] = useState(true);
  const [removeVideo, setRemoveVideo] = useState(false);
  const [removeImage, setRemoveImage] = useState(false);

  const [showimageInput, setShowImageInput] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);
  const user = useSelector(selectUser);

  const editPost = async() => {
    const updateuserInput = userInput? userInput : props.userInput;
    const updateimage = (removeImage && !image) ? " " :  image;
    const updatevideoLink = (removeVideo && !videoLink) ? videoLink : videoLink; 

    const updateRef = doc(db, "users", "user", `${user.uid}`, id);
    
    if(updateimage){
      loading(true);
        // Create a root reference
        const storage = getStorage();
        // Create a reference to 'mountains.jpg'
        const storageRef = sRef(storage, `/images/${updateimage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, updateimage);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            alert(error);
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              loading(false);

              const toFirestore = async () => {
                await updateDoc(updateRef, {
                  "userInput":updateuserInput,
                  "image": downloadURL,
                  "videoLink":updatevideoLink,
                  date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${
                    new Date().getYear() + 2000 - 100
                  }`,
                });
              };
              toFirestore();
            });
          }
        );
    closeModal(false);
    }
    else{
    loading(true)
    await updateDoc(updateRef, {
      "userInput":updateuserInput,
      "videoLink":updatevideoLink,
    });
    loading(false)
  }

  if(removeImage && !image) {
    await updateDoc(updateRef, {
      "userInput":updateuserInput,
      "videoLink":updatevideoLink,
    image: deleteField()
    });
  }
  };

  return (
    <div className="modal">
      <div className="modal_container">
        <div className="modal_top">
          <div className="modal_header">Update post</div>
          <div onClick={() => closeModal(false)} className="close">
            X
          </div>
        </div>
        <div className="modal_middle">
          <div className="user_details">
            <AccountCircleIcon
              style={{
                color: "grey",
                fontSize: "2.5rem",
                display: "inline-block",
              }}
            />
            <p>{user.displayName}</p>
            <br />
          </div>
          <textarea
            className="user_input_block"
            placeholder="What do you want to talk about?"
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          >
            {props ? props.userInput : " "}
          </textarea>
        </div>
        <div>
          {showimageInput ? (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ height: "25px", width: "50%", marginTop: "1em" }}
            />
          ) : null}

          {image ? (
            <img
              src={URL.createObjectURL(image)}
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          ):""}

         {(props.image && propImageLink) ? (
            <><img
              style={{ maxWidth: "100%", maxHeight: "300px" }}
              src={`${props.image}`}
            />
            <button onClick={()=>{
              setpropImageLink(false);
              setImage("");
              setRemoveImage(true)
            }}>Remove Image</button>
            </>
          ) : (
            ""
          )} 
        </div>
        <div>
          {showVideoInput ? (
            <input
              type="text"
              onChange={(e) => {
                setVideoLink(e.target.value);
              }}
              style={{ height: "25px", width: "50%", marginTop: "1em" }}
            />
          ) : null}
          {videoLink && (
            <ReactPlayer
              url={videoLink}
              style={{ maxWidth: "100%", marginTop: "1em", maxHeight: "250px" }}
            />
          )}

          {(props.videoLink && propVideoLink) ? (
            <>
            <ReactPlayer
              url={props.videoLink}
              style={{
                maxWidth: "100%",
                marginTop: "1em",
                maxHeight: "250px",
              }}
            />
            <button onClick={()=>{
              setpropVideoLink(false);
              setVideoLink("");
              setRemoveVideo(true)
            }}>Remove Video</button>
            </>
          ) : (
            " "
          )}
        </div>
        <div className="modal_bottom">
          <div className="modal_icons">
            <PhotoSizeSelectActualIcon
              onClick={() => {
                setShowImageInput(true);
                setShowVideoInput(false);
                setVideoLink("");
                setpropVideoLink(false);
                setpropImageLink(false);
              }}
            />
            <VideoLibraryIcon
              onClick={() => {
                setShowImageInput(false);
                setShowVideoInput(true);
                setImage("");
                setpropImageLink(false);
                setpropVideoLink(false);
              }}
            />
          </div>
            <button className="post" onClick={()=>{
              editPost();
              closeModal(false)}}>
              Update
            </button>
        </div>
      </div>
    </div>
  );
}

export default Editpost_modal;
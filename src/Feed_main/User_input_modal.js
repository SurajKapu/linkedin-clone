import React from "react";
import "./user_input_modal.css";

import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

import { useState } from "react";

import ReactPlayer from "react-player";

import { doc, setDoc } from "firebase/firestore";
import db from "../firebase";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { useSelector } from "react-redux";
import { selectUser } from "../userSlice";

function User_input_modal({ closeModal }) {
  const [userInput, setUserInput] = useState("");
  const [image, setImage] = useState();
  const [videoLink, setVideoLink] = useState("");

  const [showimageInput, setShowImageInput] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);
  const user = useSelector(selectUser);

  const uploadPost = () => {
    if (!userInput && !image && !videoLink) {
      alert("Please enter something.");
    } else {
      if (image) {
        // Create a root reference
        const storage = getStorage();
        // Create a reference to 'mountains.jpg'
        const storageRef = sRef(storage, `/images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
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
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);

              const toFirestore = async () => {
                await setDoc(doc(db, "posts", `${new Date()}`), {
                  userInput,
                  image: downloadURL,
                  date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${
                    new Date().getYear() + 2000 - 100
                  }`,
                  userName: user.displayName,
                });
              };
              toFirestore();
            });
          }
        );
        closeModal(false);
      } else {
        const toFirestore = async () => {
          await setDoc(doc(db, "posts", `${new Date()}`), {
            userInput,
            videoLink,
            date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${
              new Date().getYear() + 2000 - 100
            }`,
            userName: user.displayName,
          });
        };
        toFirestore();
        closeModal(false);
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal_container">
        <div className="modal_top">
          <div className="modal_header">Create a post</div>
          <div onClick={() => closeModal(false)} className="close">
            X
          </div>
        </div>
        <div className="modal_middle">
          <img alt={user.displayName} className="user_img" />
          <br />
          <textarea
            className="user_input_block"
            placeholder="What do you want to talk about?"
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          ></textarea>
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
          {image && (
            <img
              src={URL.createObjectURL(image)}
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          )}
        </div>
        <div>
          {showVideoInput ? (
            <input
              type="text"
              placeholder="Paste video link here"
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
        </div>
        <div className="modal_bottom">
          <div className="modal_icons">
            <PhotoSizeSelectActualIcon
              onClick={() => {
                setShowImageInput(true);
                setShowVideoInput(false);
                setVideoLink("");
              }}
            />
            <VideoLibraryIcon
              onClick={() => {
                setShowImageInput(false);
                setShowVideoInput(true);
                setImage("");
              }}
            />
          </div>
          <button className="post" onClick={uploadPost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default User_input_modal;

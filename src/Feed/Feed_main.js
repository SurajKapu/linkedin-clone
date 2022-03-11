import React from "react";
import Article from "../Feed_main/Article";
import User_post from "../Feed_main/User_post";
import "./feed_main.css";
import { useState, useEffect } from "react";

import db from "../firebase";
import { doc } from "firebase/firestore";

import { collection, onSnapshot } from "firebase/firestore";

import { useSelector } from "react-redux";
import { selectUser } from "../userSlice";

function Feed_main() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  //const docRef = doc(db, "users", "user", `${user.uid}`);

  useEffect(() => {
    onSnapshot(collection(db, "users", "user", `${user.uid}`), (snapshot) => {
      setPosts(snapshot.docs.map((docu) => ({ ...docu.data(), id: docu.id })));
    });
  }, [posts]);

  return (
    <div className="feed_main_body">
      <User_post />
      {posts.map((post) => (
        <Article props={post} id={post.id} />
      ))}
    </div>
  );
}

export default Feed_main;

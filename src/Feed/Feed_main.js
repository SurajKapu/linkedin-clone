import React from "react";
import Article from "../Feed_main/Article";
import User_post from "../Feed_main/User_post";
import "./feed_main.css";
import { useState, useEffect } from "react";
import db from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

function Feed_main() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setPosts(data.reverse());
    });
  }, [posts]);

  return (
    <div className="feed_main_body">
      <User_post />
      {posts.map((post) => (
        <Article props={post} />
      ))}
    </div>
  );
}

export default Feed_main;

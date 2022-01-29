import React from "react";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
  let navigate = useNavigate();
  return (
    <div className="homepage_container">
      <div className="homepage__body">
        <div className="header">
          <img
            className="logo"
            src="https://t3.ftcdn.net/jpg/03/95/39/16/360_F_395391650_6LfU41V5A4WIhdTis899OaF7wXVgThgP.jpg"
            alt="logo"
          />
          <div className="nav_links">
            <a
              className="join_btn"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Join now
            </a>
            <button
              className="signin_btn"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign in
            </button>
          </div>
        </div>
        <div className="homepage__content">
          <p className="welcomeText">
            Welcome to your <br />
            professional community
          </p>

          <img
            className="homepage__img"
            alt="somrthing"
            src="https://static-exp1.licdn.com/sc/h/d58zfe6h3ycgq5l1ccjpkrtdn"
          />
        </div>
      </div>
    </div>
  );
}

export default Homepage;

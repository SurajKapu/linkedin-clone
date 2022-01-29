import React from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div className="signin__container">
      <div className="signin__body">
        <img
          className="signin__logo"
          src="https://t3.ftcdn.net/jpg/03/95/39/16/360_F_395391650_6LfU41V5A4WIhdTis899OaF7wXVgThgP.jpg"
          alt="logo"
        />
        <p className="signin_subtitle_dark">Sign in</p>
        <p className="signin_subtitle_grey">
          Stay updated on your professional world
        </p>
        <form className="signin_form">
          <label>
            Email or phone number
            <br />
          </label>
          <input
            type="email"
            name="name"
            className="signin_email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />

          <label>
            Password
            <br />
          </label>
          <input
            type="password"
            name="name"
            className="signin_password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <input
            type="submit"
            value="Sign in"
            className="signin_submit"
            onClick={signIn}
          />
        </form>

        <p style={{ textAlign: "center" }}>
          New to LinkedIn?
          <span
            onClick={() => {
              navigate("/signup");
            }}
          >
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signin;

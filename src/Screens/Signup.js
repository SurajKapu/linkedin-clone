import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";

function Signup() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [fullName, setFullName] = useState("");

  const signup_User = async (e) => {
    e.preventDefault();

    if (email && password && fullName) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: fullName,
          })
            .then(() => {
              dispatch(
                login({
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                })
              );
              //Profile updated
            })
            .catch((error) => {
              //An error occured
              console.log(error);
            });
          navigate("/signin");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
          alert(errorMessage);
          // ..
        });
    } else {
      alert("please enter all details.");
    }
  };
  return (
    <div className="signup__container">
      <div className="signup__body">
        <img
          className="signup__logo"
          src="https://t3.ftcdn.net/jpg/03/95/39/16/360_F_395391650_6LfU41V5A4WIhdTis899OaF7wXVgThgP.jpg"
          alt="logo"
        />
        <p className="subtitle">Join LinkedIn now-it's free!</p>
        <form className="signup_form">
          <label>
            Full Name
            <br />
          </label>
          <input
            type="text"
            className="fullName"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <br />
          <label>
            Email address
            <br />
          </label>
          <input
            type="email"
            name="name"
            className="signup_email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />

          <label>
            Password (6 or more characters)
            <br />
          </label>

          <input
            type="password"
            name="name"
            className="signup_password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <p className="terms">
            By clicking Agree & Join, you agree to the LinkedIn
            <span> User Agreement </span>,<span> Privacy Policy</span>,
            <span>Cookie Policy.</span>
          </p>
          <input
            type="submit"
            value="Agree & Join"
            className="signup_submit"
            onClick={signup_User}
          />
        </form>

        <p style={{ textAlign: "center" }}>
          Already on LinkedIn?
          <span
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;

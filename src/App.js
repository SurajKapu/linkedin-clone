import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Screens/Homepage";
import Signup from "./Screens/Signup";
import Signin from "./Screens/Signin";
import Feed from "./Feed/Feed";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const user = useSelector(selectUser);
  return (
    <div className="App">
      <BrowserRouter>
        {user ? (
          <>
            <Feed />
          </>
        ) : (
          <>
            <Routes>
              <Route exact path="/" element={<Homepage />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
              <Route exact path="/signin" element={<Signin />}></Route>
              <Route exact path="/feed" element={<Feed />}></Route>
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;

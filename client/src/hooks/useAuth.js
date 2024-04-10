import { auth } from "firebase.config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useRef } from "react";
import { useDispatch } from "react-redux";

import { removeActiveUser } from "../redux/slices/authSlice";
import { toggleLoginPopup } from "../redux/slices/popupsSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  // const socket = useRef();

  // const signIn = async (username, email, uid) => {
  //   socket.current = new WebSocket("ws://localhost:4444");
  //   socket.current.onopen = () => {
  //     const user = {
  //       type: "registration",
  //       username,
  //       email,
  //       uid,
  //     };
  //     socket.current.send(JSON.stringify(user));
  //     console.log("підключення встановлено");
  //   };
  //   socket.current.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log(data);
  //   };
  // };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(toggleLoginPopup());
      })
      .catch((error) => {
        console.log(error);
        // setErrorMessage(error.message);
      });
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeActiveUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { signInWithGoogle, logoutUser };
};

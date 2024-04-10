import { auth } from "firebase.config";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useDispatch } from "react-redux";

import { removeActiveUser, setActiveUser } from "../redux/slices/authSlice";
import { toggleLoginPopup } from "../redux/slices/popupsSlice";
import { useConnectToDB } from "./useConnectToDB";

export const useAuth = () => {
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const { connectToDB } = useConnectToDB();

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

  const checkAuth = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setActiveUser({
            uid: user.uid,
            userName: user.displayName,
            email: user.email,
          }),
        );
        connectToDB(user.displayName, user.email, user.uid);
      } else {
        dispatch(removeActiveUser());
      }
    });
  };

  return { signInWithGoogle, logoutUser, checkAuth };
};

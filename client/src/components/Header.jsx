import { auth } from "firebase.config";
import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Button } from "ui-elements/Button";

import { removeActiveUser } from "../redux/slices/authSlice";
import { toggleLoginPopup } from "../redux/slices/popupsSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const { activeUser } = useSelector((state) => state.auth);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeActiveUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-gray-200 p-2">
      {/* <Button onClick={() => dispatch(toggleLoginPopup())}>Login</Button> */}
      {activeUser ? (
        <div className="flex justify-between">
          <Button
            onClick={() => {
              logoutUser();
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex justify-between">
          <Button onClick={() => dispatch(toggleLoginPopup())}>Login</Button>
        </div>
      )}
    </div>
  );
};

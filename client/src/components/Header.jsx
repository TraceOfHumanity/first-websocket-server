import { useAuth } from "hooks/useAuth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "ui-elements/Button";

import { toggleLoginPopup } from "../redux/slices/popupsSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const { activeUser } = useSelector((state) => state.auth);
  const { logoutUser } = useAuth();

  return (
    <div className="bg-gray-200 p-2">
      {activeUser ? (
        <div className="flex gap-2">
          {activeUser.image && (
            <img
              src={activeUser.image}
              alt="user"
              className="size-10 rounded-full"
            />
          )}
          <Button
            onClick={() => {
              logoutUser();
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Button onClick={() => dispatch(toggleLoginPopup())}>Login</Button>
      )}
    </div>
  );
};

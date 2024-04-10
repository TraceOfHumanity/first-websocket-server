import { useAuth } from "hooks/useAuth";
import React from "react";
import { useDispatch } from "react-redux";

import { Button } from "ui-elements/Button";
import { OpacityBg } from "ui-elements/OpacityBg";
import { PopupWrapper } from "ui-elements/PopupWrapper";

import { toggleLoginPopup } from "../../redux/slices/popupsSlice";

export const LoginPopup = () => {
  const dispatch = useDispatch();
  const { signInWithGoogle } = useAuth();

  return (
    <div className="">
      <form>
        <PopupWrapper className="fixed left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 transform">
          <Button
            onClick={(e) => {
              e.preventDefault();
              signInWithGoogle();
            }}
          >
            уваійти з допомогою Google
          </Button>
        </PopupWrapper>
      </form>
      <OpacityBg onClick={() => dispatch(toggleLoginPopup())} />
    </div>
  );
};

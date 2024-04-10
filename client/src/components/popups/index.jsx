import React from "react";
import { useSelector } from "react-redux";

import { LoginPopup } from "./LoginPopup";

export const PopupsContainer = () => {
  const { isLoginPopup } = useSelector((state) => state.popups);
  return (
    <div className="fixed left-0 top-0 z-50 h-0">
      {isLoginPopup && <LoginPopup />}
    </div>
  );
};

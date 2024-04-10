import React from "react";
import { useSelector } from "react-redux";

export const Home = () => {
  const { activeUser } = useSelector((state) => state.auth);
  return (
    <div>
      {!activeUser ? (
        <p>ви не авторизовані, будь ласка, увійдіть в систему</p>
      ) : (
        <p>ви авторизовані</p>
      )}
    </div>
  );
};

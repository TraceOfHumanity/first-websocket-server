import React from "react";
import { useSelector } from "react-redux";

export const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div>
      {!isAuthenticated ? (
        <p>ви не авторизовані, будь ласка, увійдіть в систему</p>
      ) : (
        <p>ви авторизовані</p>
      )}
    </div>
  );
};

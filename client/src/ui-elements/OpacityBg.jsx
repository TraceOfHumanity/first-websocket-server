import React from "react";

export const OpacityBg = ({ onClick }) => {
  return (
    <div
      className="fixed left-0 top-0 h-screen w-screen bg-black bg-opacity-30"
      onClick={onClick}
    ></div>
  );
};

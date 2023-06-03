import React from "react";

export const LoadingIcon: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 12,
      }}
    >
      <i
        className="fa-solid fa-spinner fa-spin-pulse fa-2xl"
        style={{
          color: "#F94439",
          margin: "0 auto",
          fontSize: "5rem",
        }}
      ></i>
    </div>
  );
};

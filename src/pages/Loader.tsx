import React from "react";
import { createPortal } from "react-dom";

interface LoaderProps {
  show: boolean;
}

const Loader: React.FC<LoaderProps> = ({ show }) => {
  if (!show) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2147483647,
        pointerEvents: "auto",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.7)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2147483647,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></div>
    </div>,
    document.body,
  );
};

export default Loader;

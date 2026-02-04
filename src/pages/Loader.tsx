import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface LoaderProps {
  show: boolean;
  type?: "spinner" | "dots" | "pulse" | "ring" | "bars" | "clock" | "modern";
  size?: "small" | "medium" | "large" | "xlarge";
  color?: string;
  backgroundColor?: string;
  text?: string;
  textColor?: string;
  overlayOpacity?: number;
  blur?: boolean;
  fullscreen?: boolean;
  onClose?: () => void;
  closeOnClick?: boolean;
  timeout?: number;
  progress?: boolean;
  progressValue?: number;
  customIcon?: React.ReactNode;
}

const Loader: React.FC<LoaderProps> = ({
  show,
  type = "modern",
  size = "medium",
  color = "#4361ee",
  backgroundColor = "rgba(255, 255, 255, 0.95)",
  text,
  textColor = "#333",
  overlayOpacity = 0.7,
  blur = true,
  fullscreen = true,
  onClose,
  closeOnClick = false,
  timeout,
  progress = false,
  progressValue = 0,
  customIcon,
}) => {
  const [visible, setVisible] = useState(show);
  const [internalProgress, setInternalProgress] = useState(0);

  // Handle timeout
  useEffect(() => {
    if (show && timeout) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [show, timeout, onClose]);

  // Handle show/hide with animation
  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  // Simulate progress if progress is true
  useEffect(() => {
    if (progress && show) {
      const interval = setInterval(() => {
        setInternalProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [progress, show]);

  // Reset progress when loader hides
  useEffect(() => {
    if (!show) {
      setInternalProgress(0);
    }
  }, [show]);

  if (!visible) return null;
  if (typeof document === "undefined") return null;

  const sizeMap = {
    small: 40,
    medium: 60,
    large: 80,
    xlarge: 100,
  };

  const spinnerSize = sizeMap[size];

  const renderLoader = () => {
    if (customIcon) return customIcon;

    switch (type) {
      case "spinner":
        return (
          <div
            className="loader-spinner"
            style={{ width: spinnerSize, height: spinnerSize }}
          >
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .loader-spinner {
                border: 4px solid rgba(0,0,0,0.1);
                border-radius: 50%;
                border-top: 4px solid ${color};
                animation: spin 1s linear infinite;
              }
            `}</style>
          </div>
        );

      case "dots":
        return (
          <div
            className="loader-dots"
            style={{ width: spinnerSize, height: spinnerSize / 3 }}
          >
            <style>{`
              @keyframes bounce {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
              }
              .loader-dots {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .loader-dots::before,
              .loader-dots::after,
              .loader-dots span {
                content: '';
                width: ${spinnerSize / 5}px;
                height: ${spinnerSize / 5}px;
                background-color: ${color};
                border-radius: 50%;
                animation: bounce 1.4s infinite ease-in-out both;
              }
              .loader-dots span {
                animation-delay: -0.32s;
              }
              .loader-dots::before {
                animation-delay: -0.16s;
              }
            `}</style>
            <span />
          </div>
        );

      case "pulse":
        return (
          <div
            className="loader-pulse"
            style={{ width: spinnerSize, height: spinnerSize }}
          >
            <style>{`
              @keyframes pulse {
                0%, 100% { transform: scale(0.8); opacity: 0.5; }
                50% { transform: scale(1); opacity: 1; }
              }
              @keyframes ripple {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(2); opacity: 0; }
              }
              .loader-pulse {
                position: relative;
                background-color: ${color};
                border-radius: 50%;
                animation: pulse 1.5s ease-in-out infinite;
              }
              .loader-pulse::before {
                content: '';
                position: absolute;
                top: -10%;
                left: -10%;
                right: -10%;
                bottom: -10%;
                border: 2px solid ${color};
                border-radius: 50%;
                animation: ripple 2s linear infinite;
              }
            `}</style>
          </div>
        );

      case "ring":
        return (
          <div
            className="loader-ring"
            style={{ width: spinnerSize, height: spinnerSize }}
          >
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .loader-ring div {
                box-sizing: border-box;
                display: block;
                position: absolute;
                width: ${spinnerSize * 0.8}px;
                height: ${spinnerSize * 0.8}px;
                margin: ${spinnerSize * 0.1}px;
                border: ${spinnerSize * 0.08}px solid ${color};
                border-radius: 50%;
                animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                border-color: ${color} transparent transparent transparent;
              }
              .loader-ring div:nth-child(1) {
                animation-delay: -0.45s;
              }
              .loader-ring div:nth-child(2) {
                animation-delay: -0.3s;
              }
              .loader-ring div:nth-child(3) {
                animation-delay: -0.15s;
              }
              .loader-ring {
                display: inline-block;
                position: relative;
              }
            `}</style>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        );

      case "bars":
        return (
          <div
            className="loader-bars"
            style={{ width: spinnerSize, height: spinnerSize }}
          >
            <style>{`
              @keyframes bars {
                0%, 40%, 100% { transform: scaleY(0.4); }
                20% { transform: scaleY(1); }
              }
              .loader-bars {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: ${spinnerSize / 10}px;
              }
              .loader-bars span {
                width: ${spinnerSize / 6}px;
                height: ${spinnerSize}px;
                background-color: ${color};
                animation: bars 1.2s ease-in-out infinite;
              }
              .loader-bars span:nth-child(2) {
                animation-delay: -1.1s;
              }
              .loader-bars span:nth-child(3) {
                animation-delay: -1.0s;
              }
              .loader-bars span:nth-child(4) {
                animation-delay: -0.9s;
              }
              .loader-bars span:nth-child(5) {
                animation-delay: -0.8s;
              }
            `}</style>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        );

      case "clock":
        return (
          <div
            className="loader-clock"
            style={{ width: spinnerSize, height: spinnerSize }}
          >
            <style>{`
              @keyframes clock-hour {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes clock-minute {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .loader-clock {
                position: relative;
                border: 2px solid rgba(0,0,0,0.1);
                border-radius: 50%;
              }
              .loader-clock::before,
              .loader-clock::after {
                content: '';
                position: absolute;
                background-color: ${color};
                border-radius: 2px;
                transform-origin: bottom center;
              }
              .loader-clock::before {
                width: 2px;
                height: ${spinnerSize * 0.3}px;
                top: ${spinnerSize * 0.2}px;
                left: 50%;
                margin-left: -1px;
                animation: clock-hour 6s linear infinite;
              }
              .loader-clock::after {
                width: 2px;
                height: ${spinnerSize * 0.4}px;
                top: ${spinnerSize * 0.1}px;
                left: 50%;
                margin-left: -1px;
                animation: clock-minute 1s linear infinite;
              }
            `}</style>
          </div>
        );

      case "modern":
      default:
        return (
          <div
            className="loader-modern"
            style={{ width: spinnerSize, height: spinnerSize }}
          >
            <style>{`
              @keyframes modern-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes modern-gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .loader-modern {
                background: linear-gradient(45deg, ${color}, #7209b7, ${color});
                background-size: 200% 200%;
                border-radius: 50%;
                position: relative;
                animation: modern-spin 1.5s linear infinite, modern-gradient 3s ease infinite;
              }
              .loader-modern::before {
                content: '';
                position: absolute;
                top: 10%;
                left: 10%;
                right: 10%;
                bottom: 10%;
                background: ${backgroundColor};
                border-radius: 50%;
              }
              .loader-modern::after {
                content: '';
                position: absolute;
                top: 20%;
                left: 20%;
                right: 20%;
                bottom: 20%;
                background: linear-gradient(45deg, ${color}, #7209b7);
                background-size: 200% 200%;
                border-radius: 50%;
                animation: modern-gradient 3s ease infinite reverse;
              }
            `}</style>
          </div>
        );
    }
  };

  const loaderContent = (
    <div
      className="loader-container"
      style={{
        position: fullscreen ? "fixed" : "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2147483647,
        pointerEvents: closeOnClick ? "auto" : "none",
        flexDirection: "column",
        opacity: show ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      onClick={closeOnClick ? onClose : undefined}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(0, 0, 0, ${overlayOpacity})`,
          backdropFilter: blur ? "blur(4px)" : "none",
          WebkitBackdropFilter: blur ? "blur(4px)" : "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2147483647,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          backgroundColor,
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          minWidth: "200px",
          minHeight: "200px",
          transform: show ? "scale(1)" : "scale(0.9)",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {renderLoader()}

        {(text || progress) && (
          <div
            style={{ marginTop: "30px", textAlign: "center", width: "100%" }}
          >
            {text && (
              <p
                style={{
                  margin: "0 0 15px 0",
                  fontSize: size === "small" ? "14px" : "16px",
                  color: textColor,
                  fontWeight: 500,
                }}
              >
                {text}
              </p>
            )}

            {progress && (
              <div
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "6px",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "3px",
                    overflow: "hidden",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      width: `${progressValue || internalProgress}%`,
                      height: "100%",
                      background: `linear-gradient(90deg, ${color}, #7209b7)`,
                      borderRadius: "3px",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: textColor,
                    margin: 0,
                    opacity: 0.8,
                  }}
                >
                  {progressValue || internalProgress}%
                </p>
              </div>
            )}
          </div>
        )}

        {onClose && !closeOnClick && (
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: "none",
              border: "none",
              color: textColor,
              fontSize: "24px",
              cursor: "pointer",
              opacity: 0.7,
              transition: "opacity 0.3s",
              padding: "5px",
              lineHeight: 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );

  return createPortal(loaderContent, document.body);
};

export default Loader;

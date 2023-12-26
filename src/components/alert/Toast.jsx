import React, { useEffect, useRef, useState } from "react";
import { useToast } from "../../hooks/useToast";
import ToastIcon from "./ToastIcons";

const toastTypes = {
  success: {
    icon: <ToastIcon size={100} color="green" />,
    iconClass: "success-icon",
    progressBarClass: "success",
  },
  warning: {
    icon: <ToastIcon size={100} color="orange" />,
    iconClass: "warning-icon",
    progressBarClass: "warning",
  },
  info: {
    icon: <ToastIcon size={100} color="blue" />,
    iconClass: "info-icon",
    progressBarClass: "info",
  },
  error: {
    icon: <ToastIcon size={100} color="red" />,
    iconClass: "error-icon",
    progressBarClass: "error",
  },
};
const Toast = ({ message, type, id }) => {
  const { icon, iconClass, progressBarClass } = toastTypes[type];
  const toast = useToast(); // call useToast
  const handleDismiss = () => {
    setDismissed(true);
    toast.remove(id);
  };

  const timerID = useRef(null); // create a Reference

  useEffect(() => {
    timerID.current = setTimeout(() => {
      handleDismiss();
    }, 14000);

    return () => {
      clearTimeout(timerID.current);
    };
  }, []);

  const progressRef = useRef(null);

  const [dismissed, setDismissed] = useState(false);

  const handleMouseEnter = () => {
    clearTimeout(timerID.current);
    progressRef.current.style.animationPlayState = "paused";
  };

  const handleMouseLeave = () => {
    const remainingTime =
      (progressRef.current.offsetWidth /
        progressRef.current.parentElement.offsetWidth) *
      4000;

    progressRef.current.style.animationPlayState = "running";

    timerID.current = setTimeout(() => {
      handleDismiss();
    }, remainingTime);
  };

  return (
    <div
      className={`toast flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${
        dismissed ? "toast-dismissed" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
        <span className={iconClass}>{icon}</span>
      </div>
      <div className="toast-message ms-3 text-sm font-normal">{message}</div>
      <button
        onClick={handleDismiss}
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
      {/* Toast Progress Bar */}
      <div className="toast-progress">
        <div
          ref={progressRef}
          className={`toast-progress-bar ${progressBarClass}`}
        ></div>
      </div>
    </div>
  );
};

export default Toast;
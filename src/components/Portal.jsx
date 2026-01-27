import React from "react";
import ReactDOM from "react-dom";

export default function Portal({ children }) {
  const modalRoot = document.getElementById("modal-root");
  return ReactDOM.createPortal(children, modalRoot);
}

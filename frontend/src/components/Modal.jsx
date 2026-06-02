import React from "react";
import Portal from "./Portal";

export default function Modal({
  isOpen,
  onClose,
  children,
  customStyles = {},
}) {
  if (!isOpen) return null;

  const defaultBackdropStyles =
    "fixed inset-0 z-50 bg-black/80 grid place-items-center";

  const defaultContainerStyles =
    "lg:w-3/4 gap-4 border shadow-lg duration-200 rounded-2xl max-w-2xl bg-[#121212] border-white/10 text-white animate__animated animate__zoomIn";

  return (
    <Portal>
      <div
        className={`${defaultBackdropStyles} ${customStyles.backdrop}`}
        onClick={onClose}
      >
        <div
          className={`${defaultContainerStyles} ${customStyles.container}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}

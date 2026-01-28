import React from "react";
import Portal from "./Portal";

export default function Modal({
  isOpen,
  onClose,
  children,
  customStyles = {},
}) {
  if (!isOpen) return null;

  const defaultBackdropStyles = "fixed inset-0 z-50 bg-black/80";

  const defaultContainerStyles =
    "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg max-w-2xl bg-[#121212] border-white/10 text-white";

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

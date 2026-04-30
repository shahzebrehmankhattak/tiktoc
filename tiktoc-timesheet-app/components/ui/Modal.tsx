"use client";

import React from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  widthClass?: string;
};

const Modal = ({ open, title, onClose, children, widthClass = "max-w-sm" }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl w-full ${widthClass} shadow-2xl p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900 text-base">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 text-lg leading-none"
            >
              ✕
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
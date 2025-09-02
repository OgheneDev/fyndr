import React, { useEffect, useRef } from "react";

export function Dialog({ open, onOpenChange, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={dialogRef}
        className="max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ className = "", children }) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-3xl shadow-lg p-6 max-w-full w-full ${className}`}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return (
    <h2 className="text-xl font-bold text-gray-900">{children}</h2>
  );
}

export function DialogDescription({ children }) {
  return (
    <p className="text-sm text-gray-600 mt-1">{children}</p>
  );
}
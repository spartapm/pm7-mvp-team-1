"use client";

type ToastProps = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export function Toast({ open, message, onClose }: ToastProps) {
  if (!open) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 z-[2000] flex -translate-x-1/2 items-center gap-3.5 rounded-[10px] bg-[#26282b] px-4 py-3 text-[13px] text-white shadow-[0_8px_26px_rgba(0,0,0,.25)]"
      role="status"
      onClick={onClose}
    >
      <span>{message}</span>
      <button
        type="button"
        className="text-xs font-extrabold text-[#8fd6ff]"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        확인
      </button>
    </div>
  );
}

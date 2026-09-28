import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  type?: 'success' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, type = 'success' }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900/95 text-white shadow-2xl backdrop-blur-md border border-slate-700/50">
        <span className="material-symbols-outlined text-emerald-400 text-[22px]">
          {type === 'success' ? 'check_circle' : 'info'}
        </span>
        <span className="text-xs sm:text-sm font-semibold tracking-wide">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
};

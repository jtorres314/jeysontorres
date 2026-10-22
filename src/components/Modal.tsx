import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#020e21]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Shell */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#132033] border border-[#1d2a3e] rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 text-[#d6e3fe]">
        {/* Header */}
        <div className="p-5 md:p-6 bg-[#1d2a3e]/80 border-b border-[#28354a] flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            {badge && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0f5132] text-[#4edea3] text-[11px] font-bold uppercase tracking-wider w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                {badge}
              </span>
            )}
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#d6e3fe] leading-snug">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs md:text-sm text-[#bbcabf]">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#132033] hover:bg-[#28354a] text-[#bbcabf] hover:text-[#4edea3] transition-colors shrink-0"
            aria-label="Cerrar modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

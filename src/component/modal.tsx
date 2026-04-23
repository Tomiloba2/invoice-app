import { useEffect, useRef } from 'react';

export default function Modal({ invoiceId, onConfirm, onCancel, isOpen = true }: {
    invoiceId: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    isOpen: boolean
}) {
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onCancel?.();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isOpen, onCancel]);

    // Handle ESC key press
    useEffect(() => {
        if (!isOpen) return;

        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onCancel?.();
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [isOpen, onCancel]);
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300" />

            {/* Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
                <div
                    ref={modalRef}
                    className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-auto transform transition-all duration-300 animate-in fade-in zoom-in"
                >
                    {/* Content */}
                    <div className="p-6 sm:p-8">
                        {/* Title */}
                        <h2 className="text-[#0C0E16] dark:text-white font-leagueSpartan text-xl sm:text-2xl font-bold tracking-[-0.0208em] mb-3">
                            Confirm Deletion
                        </h2>

                        {/* Message */}
                        <p className="text-[#888EB0] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium leading-relaxed sm:leading-[22px] mb-6 sm:mb-8">
                            Are you sure you want to delete invoice {invoiceId}? This action cannot be undone.
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 sm:justify-end">
                            <button
                                onClick={onCancel}
                                className="w-full sm:w-auto px-6 py-3 rounded-3xl bg-[#F9FAFE] dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#7E88C3] dark:text-gray-300 font-leagueSpartan text-[15px] font-bold transition-all duration-200 active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="w-full sm:w-auto px-6 py-3 rounded-3xl bg-[#EC5757] hover:bg-[#FF9797] text-white font-leagueSpartan text-[15px] font-bold transition-all duration-200 active:scale-95"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes zoomIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-in {
          animation-duration: 0.2s;
          animation-fill-mode: both;
        }
        
        .fade-in {
          animation-name: fadeIn;
        }
        
        .zoom-in {
          animation-name: zoomIn;
        }
      `}</style>
        </>
    );
}
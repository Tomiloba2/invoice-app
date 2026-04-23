import { useEffect } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function Drawer({ isOpen, onClose, children }: Props) {
    // Prevent background scroll

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        }

        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>

            {/* Overlay */}
            <div
                onClick={onClose}
                className={`
          absolute inset-0 bg-black/40 transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
            />

            {/* Drawer */}
            <div
                className={`
    absolute left-0 top-0 h-full w-full sm:w-120
    bg-white dark:bg-gray-900 shadow-xl
    transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
            >
                {/* Drawer layout */}
                <div className="flex flex-col h-full">

                    {/* Header (fixed) */}
                    <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="font-bold text-lg">New Invoice</h2>
                        <button onClick={onClose}>✕</button>
                    </div>

                    {/* 🔥 SCROLLABLE CONTENT */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    );
}
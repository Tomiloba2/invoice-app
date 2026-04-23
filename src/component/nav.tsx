import { useState } from "react";
import { fetchRecords, type Record } from "../schema/db";

export default function Navbar({ onClick, setInvoice }: { onClick: () => void, setInvoice: React.Dispatch<React.SetStateAction<Record[]>> }) {

    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState<string | null>(null);
    const invioce: Record[] = fetchRecords()
    const toggleFilter = (status: string) => {
        setFilter(prev => (prev === status ? null : status));
        const data = invioce.filter(item => item.status === status)
        setInvoice(data)
    };

    return (
        <div className="w-full flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
            {/* Header Section */}
            <div className="flex flex-row items-center justify-between gap-6">
                {/* Title and Count Section */}
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-[#0C0E16] dark:text-white font-leagueSpartan text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.0313em]">
                        Invoices
                    </h1>
                    <p className="text-[#888EB0] font-leagueSpartan text-xs sm:text-[13px] font-medium leading-3.75 tracking-[-0.0077em]">
                        There are 7 total invoices
                    </p>
                </div>

                {/* Controls Section - Filter and Button */}
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                    {/* Filter Button */}
                    <div>
                        <button onClick={() => setOpen(prev => !prev)}
                            className="cursor-pointer inline-flex items-center gap-2 sm:gap-3.5 group">
                            <span className="text-[#0C0E16] dark:text-white font-leagueSpartan text-sm sm:text-[15px] font-bold leading-3.75 tracking-[-0.0167em] whitespace-nowrap">
                                Filter by status
                            </span>
                            <svg
                                width="10"
                                height="7"
                                viewBox="0 0 10 7"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-2 h-1.5 transition-transform duration-200 group-hover:translate-y-0.5"
                            >
                                <path
                                    d="M0.707031 0.707153L4.93493 4.93505L9.16283 0.707153"
                                    stroke="#7C5DFA"
                                    strokeWidth="2"
                                />
                            </svg>
                        </button>
                        {/* Dropdown */}
                        {open && (
                            <div className="absolute mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-50">
                                {["draft", "pending", "paid"].map(status => (
                                    <label
                                        key={status}
                                        className="flex items-center gap-3 mb-2 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filter === status}
                                            onChange={() => toggleFilter(status)}
                                        />
                                        <span className="capitalize dark:text-white">{status}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* New Invoice Button */}
                    <button
                        onClick={onClick}
                        className="group relative rounded-3xl bg-[#7C5DFA] hover:bg-[#9277FF] transition-colors duration-200 w-auto sm:w-37.5 h-12 px-4 sm:px-0">
                        <div className="flex items-center gap-2 sm:gap-3 h-full">
                            {/* Plus Icon Circle */}
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-2.5 h-2.5"
                                >
                                    <path
                                        d="M6.29017 10V6.29017H10V3.70983H6.29017V0H3.70983V3.70983H0V6.29017H3.70983V10H6.29017Z"
                                        fill="#7C5DFA"
                                    />
                                </svg>
                            </div>
                            {/* Button Text - Hide text on mobile, show on sm and up */}
                            <span className="text-white font-leagueSpartan text-[15px] font-bold leading-3.75 tracking-[-0.0167em] hidden sm:inline">
                                New Invoice
                            </span>
                            {/* Short text for mobile */}
                            <span className="text-white font-leagueSpartan text-[15px] font-bold leading-3.75 tracking-[-0.0167em] sm:hidden">
                                New
                            </span>
                        </div>
                    </button>
                </div>
            </div>

        </div >
    );
}
import { useState } from 'react';


type filterType = "pending" | "draft" | "paid" | null
export default function FilterComponent({ onFilterChange, initialFilter = null }: {
    onFilterChange: (params: filterType) => void,
    initialFilter: filterType
}) {
    const [selectedFilter, setSelectedFilter] = useState<filterType>(initialFilter || 'pending');

    const filters: {
        id: filterType;
        label: "Draft" | "Pending" | "Paid";
        checked: boolean;
    }[] = [
            { id: 'draft', label: 'Draft', checked: false },
            { id: 'pending', label: 'Pending', checked: true },
            { id: 'paid', label: 'Paid', checked: false }
        ];

    const handleFilterChange = (filterId: filterType) => {
        setSelectedFilter(filterId);
        onFilterChange?.(filterId);
    };

    return (
        <div className="relative">
            {/* Filter Dropdown Button - For mobile/compact view */}
            <div className="sm:hidden">
                <button className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <span className="text-[#0C0E16] dark:text-white font-leagueSpartan text-[15px] font-bold">
                        Filter by status
                    </span>
                    <svg
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform duration-200"
                    >
                        <path
                            d="M0.707031 0.707153L4.93493 4.93505L9.16283 0.707153"
                            stroke="#7C5DFA"
                            strokeWidth="2"
                        />
                    </svg>
                </button>
            </div>

            {/* Filter Options - Desktop view */}
            <div className="hidden sm:block relative">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-[0_10px_20px_rgba(72,84,159,0.25)] p-4 min-w-[160px]">
                    {filters.map((filter) => (
                        <div
                            key={filter.id}
                            className="flex items-center justify-end gap-3.25 mb-4 last:mb-0 cursor-pointer group"
                            onClick={() => handleFilterChange(filter.id)}
                        >
                            <span className={`text-[#0C0E16] dark:text-white font-leagueSpartan text-[15px] font-bold leading-[15px] tracking-[-0.0167em] transition-colors group-hover:text-[#7C5DFA] ${selectedFilter === filter.id ? 'text-[#7C5DFA]' : ''
                                }`}>
                                {filter.label}
                            </span>

                            <div className="relative">
                                {/* Checkbox container */}
                                <div className={`w-4 h-4 rounded-sm border transition-all duration-200 ${selectedFilter === filter.id
                                    ? 'bg-[#7C5DFA] border-[#7C5DFA]'
                                    : 'border-[#7C5DFA] bg-[#DFE3FA] dark:bg-gray-700'
                                    }`}>
                                    {selectedFilter === filter.id && (
                                        <svg
                                            width="9"
                                            height="8"
                                            viewBox="0 0 9 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[7px] h-[5px]"
                                        >
                                            <path
                                                d="M0.707031 3.92847L2.83128 6.05273L8.17698 0.707031"
                                                stroke="white"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Filter Modal (optional - for better UX on mobile) */}
            <div className="sm:hidden">
                <input type="checkbox" id="filter-modal" className="hidden peer" />
                <div className="fixed inset-0 bg-black/50 z-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible transition-all duration-300">
                    <div className="absolute inset-x-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-2xl p-6 transform translate-y-full peer-checked:translate-y-0 transition-transform duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-[#0C0E16] dark:text-white font-leagueSpartan text-xl font-bold">
                                Filter by status
                            </h3>
                            <label htmlFor="filter-modal" className="cursor-pointer text-[#7E88C3] text-2xl">
                                ✕
                            </label>
                        </div>

                        {filters.map((filter) => (
                            <div
                                key={filter.id}
                                className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-0 cursor-pointer"
                                onClick={() => {
                                    handleFilterChange(filter.id);
                                }}
                            >
                                <span className={`text-[#0C0E16] dark:text-white font-leagueSpartan text-[15px] font-bold ${selectedFilter === filter.id ? 'text-[#7C5DFA]' : ''
                                    }`}>
                                    {filter.label}
                                </span>

                                <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${selectedFilter === filter.id
                                    ? 'bg-[#7C5DFA] border-[#7C5DFA]'
                                    : 'border-[#7E88C3]'
                                    }`}>
                                    {selectedFilter === filter.id && (
                                        <svg
                                            className="w-full h-full p-1 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <label
                    htmlFor="filter-modal"
                    className="fixed inset-0 bg-black/50 z-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible transition-all duration-300"
                ></label>
            </div>
        </div>
    );
}
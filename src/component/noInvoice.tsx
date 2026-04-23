export default function NoInvoice() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Empty State Container */}
            <div className="flex flex-col items-center justify-center text-center">

                {/* Illustration Container - Responsive sizing */}
                <div className="relative w-full max-w-75 sm:max-w-100 md:max-w-125 lg:max-w-150 mb-1">
                    <div className="relative w-full h-auto">
                        {/* Main background shapes */}
                        <div className="relative w-full pb-[75%]">
                            <svg
                                className="absolute inset-0 w-full h-full"
                                viewBox="0 0 242 200"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g opacity="0.8">
                                    {/* Background circle */}
                                    <circle cx="121" cy="100" r="90" fill="#F8F8FB" />

                                    <path
                                        d="M121 30L160 50L160 150L121 170L82 150L82 50L121 30Z"
                                        fill="#E6E7E8"
                                        stroke="#7C5DFA"
                                        strokeWidth="2"
                                    />

                                    {/* Inner shape */}
                                    <path
                                        d="M121 45L152 61L152 139L121 155L90 139L90 61L121 45Z"
                                        fill="white"
                                        stroke="#7C5DFA"
                                        strokeWidth="1.5"
                                    />

                                    {/* Plus icon */}
                                    <g transform="translate(112, 92)">
                                        <rect x="4" y="0" width="2" height="16" fill="#7C5DFA" rx="1" />
                                        <rect x="0" y="4" width="16" height="2" fill="#7C5DFA" rx="1" />
                                    </g>

                                    {/* Document lines */}
                                    <rect x="130" y="75" width="20" height="3" fill="#D1D3D4" rx="1.5" />
                                    <rect x="130" y="85" width="30" height="3" fill="#D1D3D4" rx="1.5" />
                                    <rect x="130" y="95" width="25" height="3" fill="#D1D3D4" rx="1.5" />

                                    {/* Small decorative dots */}
                                    <circle cx="90" cy="65" r="2" fill="#7C5DFA" opacity="0.6" />
                                    <circle cx="152" cy="135" r="2" fill="#7C5DFA" opacity="0.6" />
                                    <circle cx="85" cy="135" r="1.5" fill="#7C5DFA" opacity="0.4" />
                                    <circle cx="155" cy="65" r="1.5" fill="#7C5DFA" opacity="0.4" />
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Empty State Text Content */}
                <div className="max-w-sm sm:max-w-md mx-auto">
                    <h2 className="text-[#0C0E16] dark:text-white font-leagueSpartan text-xl sm:text-2xl md:text-3xl font-bold tracking-[-0.0313em] mb-3 sm:mb-4">
                        There is nothing here
                    </h2>
                    <p className="text-[#888EB0] dark:text-gray-400 font-leagueSpartan text-xs sm:text-sm md:text-base font-medium leading-relaxed px-4">
                        Create an invoice by clicking the{" "}
                        <span className="font-semibold text-[#7C5DFA]">New Invoice</span>{" "}
                        button and get started
                    </p>
                </div>

                {/* Optional: Call to Action Button */}
                <div className="mt-8 sm:mt-10">
                    <button className="inline-flex items-center gap-2 bg-[#7C5DFA] hover:bg-[#9277FF] text-white font-leagueSpartan font-bold px-6 sm:px-8 py-3 rounded-3xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.29017 10V6.29017H10V3.70983H6.29017V0H3.70983V3.70983H0V6.29017H3.70983V10H6.29017Z"
                                fill="white"
                            />
                        </svg>
                        <span>New Invoice</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
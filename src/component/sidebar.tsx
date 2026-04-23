export default function Sidebar({ onClick }: { onClick: () => void }) {
    return (
        <div className="
      flex flex-row md:flex-col
      w-full md:w-25.75
      h-20 md:h-auto
      md:min-h-screen
      bg-[#373B53]
      md:rounded-r-[20px]
    ">

            {/* Logo Section */}
            <div className="
        relative flex items-center justify-center
        w-20 md:w-full
        h-full md:h-25.75
      ">
                <div className="absolute inset-0 bg-[#7C5DFA] md:rounded-tr-[20px]"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#9277FF] rounded-tl-[20px]"></div>

                <div className="relative w-10 h-10 bg-white rounded-full z-10"></div>
            </div>

            {/* Spacer (push bottom content down on desktop) */}
            <div className="hidden md:flex flex-1"></div>

            {/* Right / Bottom Section */}
            <div className="
        flex items-center gap-4
        ml-auto md:ml-0
        px-4 md:px-0
        md:flex-col md:gap-6 md:pb-6
      ">

                {/* Theme Icon */}
                <svg onClick={onClick} className="w-5 h-5 cursor-pointer" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M19.5016 11.3423C19.2971 13.4211 18.3182 15.3552 16.7502 16.7503C15.1821 18.1454 13.1463 18.9021 11.0426 18.8656C8.93896 18.8291 6.93249 18.0017 5.41743 16.552C3.90237 15.1022 2.98949 13.1414 2.85278 11.0615C2.71607 8.98163 3.36641 6.91531 4.67869 5.28245C5.99097 3.64959 7.87536 2.56276 9.96547 2.24662C9.53735 3.03877 9.30298 3.92033 9.28131 4.82055C9.25963 5.72077 9.45125 6.61234 9.8375 7.42273C10.2237 8.23312 10.7923 8.9463 11.5 9.50659C12.2077 10.0669 13.0361 10.4582 13.9235 10.6494C14.8109 10.8407 15.7324 10.8266 16.6136 10.6083C17.4949 10.39 18.3221 9.97367 19.0139 9.38738C19.7057 8.80109 20.2426 8.05991 20.5803 7.22036C20.9179 6.3808 21.0471 5.47534 20.9566 4.57777C21.8722 5.78891 22.2856 7.30167 22.1154 8.80777C21.9452 10.3139 21.2061 11.7105 20.0393 12.7126"
                        fill="#DFE3FA"
                    />
                </svg>

                {/* Divider (desktop only) */}
                <div className="hidden md:block w-full h-px bg-[#494E6E]"></div>

                {/* Avatar */}
                <img
                    src="/hero.png"
                    className="w-10 h-10 rounded-full"
                    alt="avatar"
                />
            </div>
        </div>
    );
}
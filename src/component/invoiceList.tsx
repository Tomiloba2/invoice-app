import { useNavigate } from "react-router-dom";
import NoInvoice from "./noInvoice";
import { fetchRecords, type Record } from "../schema/db";

export default function InvoiceList({invoices}:{invoices:Record[]}) {
    const navigate = useNavigate()
    

    const getStatusStyles = (status: "paid" | "pending" | "draft") => {
        const baseStyles = "flex items-center justify-center gap-2 px-4 py-2 rounded-md font-bold text-[15px] w-[104px]";
        const colorStyles = {
            paid: "bg-[#33D69F]/10 text-[#33D69F]",
            pending: "bg-[#FF8F00]/10 text-[#FF8F00]",
            draft: "bg-[#373B53]/10 text-[#373B53]"
        };

        return `${baseStyles} ${colorStyles[status] || colorStyles.pending}`;
    };

    return (
        <div className="w-full flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
            {/* Invoices List */}
            <div className="space-y-4">
                {invoices?.map((invoice: Record) => (
                    <div
                        key={invoice.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group cursor-pointer"
                    >
                        {/* Desktop Layout (hidden on mobile, visible on md+) */}
                        <div className="hidden md:flex items-center justify-between p-4 lg:p-6">
                            {/* Left Section - Invoice ID */}
                            <div className="w-20 lg:w-25">
                                <p className="text-[#0C0E16] dark:text-white font-leagueSpartan text-[15px] font-bold tracking-[-0.0167em]">
                                    {invoice.id}
                                </p>
                            </div>

                            {/* Due Date */}
                            <div className="w-30 lg:w-35">
                                <p className="text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium">
                                    Due {invoice?.invoiceDate}
                                </p>
                            </div>

                            {/* Client Name */}
                            <div className="w-37.5 lg:w-45">
                                <p className="text-[#858BB2] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium">
                                    {invoice.clientName}
                                </p>
                            </div>

                            {/* Amount */}
                            <div className="w-30 lg:w-35 text-right">
                                <p className="text-[#0C0E16] dark:text-white font-leagueSpartan text-[15px] font-bold tracking-[-0.0167em]">
                                    {invoice.amount}
                                </p>
                            </div>

                            {/* Status Badge */}
                            <div className="w-30">
                                <div className={getStatusStyles(invoice.status)}>
                                    <div className="w-2 h-2 rounded-full bg-current"></div>
                                    <span className="capitalize">{invoice.status}</span>
                                </div>
                            </div>

                            {/* Arrow Icon */}
                            <div className="ml-4" onClick={() => navigate(`/${invoice.id}`)}>
                                <svg
                                    width="7"
                                    height="10"
                                    viewBox="0 0 7 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-2 h-3 text-[#7C5DFA] group-hover:translate-x-1 transition-transform"
                                >
                                    <path
                                        d="M0.707031 0.707153L4.70703 4.70715L0.707031 8.70715"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Mobile Layout (visible on mobile, hidden on md+) */}
                        <div className="md:hidden p-4 space-y-3">
                            {/* Top Row - ID and Client */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-[#0C0E16] dark:text-white font-leagueSpartan text-[15px] font-bold tracking-[-0.0167em]">
                                        {invoice.id}
                                    </p>
                                    <p className="text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[12px] font-medium mt-1">
                                        Due {invoice.paymentTerms}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[#858BB2] dark:text-gray-400 font-leagueSpartan text-[12px] font-medium">
                                        {invoice.clientName}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom Row - Amount and Status */}
                            <div className="flex justify-between items-center">
                                <p className="text-[#0C0E16] dark:text-white font-leagueSpartan text-[16px] font-bold tracking-[-0.0167em]">
                                    {invoice.amount}
                                </p>
                                <div className={getStatusStyles(invoice.status)}>
                                    <div className="w-2 h-2 rounded-full bg-current"></div>
                                    <span className="capitalize text-[13px]">{invoice.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Empty State (optional) */}
            {
                invoices?.length === 0 && (
                    <NoInvoice />)
            }
        </div>
    )
}

 
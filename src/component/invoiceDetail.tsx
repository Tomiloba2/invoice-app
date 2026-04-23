import { useState } from "react";
import Modal from "./modal";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRecord, fetchRecord, updateRecord, type Record } from "../schema/db";

export default function InvoiceDetails({ onClick }: { onClick: () => void }) {
  const { id } = useParams()
  const [open, setIsOpen] = useState(false)
  const navigate = useNavigate()
  console.log(open);

  // Invoice data structure
  const invoice: Record | undefined = id ? fetchRecord(id) : undefined
  const onConfirm = () => {
    const data = deleteRecord(id)
    if (data) {
      navigate(-1)
    }
  }
  const MarkRead = () => {
    if (!invoice || !id) return;

    updateRecord(id, {
      ...invoice,
      status: "paid"
    });
    window.location.reload()
  }

  const getStatusStyles = (status: any) => {
    const styles: any = {
      paid: "bg-[#33D69F]/10 text-[#33D69F]",
      pending: "bg-[#FF8F00]/10 text-[#FF8F00]",
      draft: "bg-[#373B53]/10 text-[#373B53]"
    };
    return styles[status] || styles.pending;
  };
  const total = invoice?.itemList.reduce((total, item) => {
    return total + item.qty * item.price;
  }, 0);

  return (
    <div className="w-full flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      {/* Go Back Button */}
      <button onClick={() => navigate(-1)}
        className="group inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 hover:opacity-75 transition-opacity">
        <svg
          width="7"
          height="10"
          viewBox="0 0 7 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-2 h-3"
        >
          <path
            d="M6.5 9L2 5L6.5 1"
            stroke="#7C5DFA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="text-[#0C0E16] dark:text-white font-leagueSpartan text-sm sm:text-[15px] font-bold">
          Go back
        </span>
      </button>

      {/* Status Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Status Section */}
          <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-5">
            <p className="text-[#858BB2] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium">
              Status
            </p>
            <div className={`${getStatusStyles(invoice?.status)} flex items-center gap-2 px-4 py-2 rounded-md font-bold text-[15px] min-w-26 justify-center`}>
              <div className="w-2 h-2 rounded-full bg-current"></div>
              <span className="capitalize">{invoice?.status}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
            <button
              onClick={onClick}
              className="bg-[#F9FAFE] dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#7E88C3] dark:text-gray-300 font-leagueSpartan text-[15px] font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-3xl transition-colors">
              Edit
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-[#EC5757] hover:bg-[#FF9797] text-white font-leagueSpartan text-[15px] font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-3xl transition-colors">
              Delete
            </button>
            <button
              onClick={MarkRead}
              className="bg-[#7C5DFA] hover:bg-[#9277FF] text-white font-leagueSpartan text-[15px] font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-3xl transition-colors">
              Mark as Paid
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Details Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6 sm:mb-8">
          <div>
            <h2 className="text-[#0C0E16] dark:text-white font-leagueSpartan text-xl sm:text-2xl font-bold tracking-[-0.0167em] mb-2">
              {invoice?.id}
            </h2>
            <p className="text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium">
              {invoice?.projectDescription}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium leading-relaxed whitespace-pre-line">
              {invoice?.from_streetAddress}<br />
              {invoice?.from_city}<br />
              {invoice?.from_postcode}<br />
              {invoice?.from_country}
            </p>
          </div>
        </div>

        {/* Dates and Client Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Invoice Date */}
          <div>
            <p className="text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
              Invoice Date
            </p>
            <p className="text-[#0C0E16] dark:text-white font-leagueSpartan text-[15px] sm:text-base font-bold">
              {invoice?.invoiceDate}
            </p>
          </div>

          {/* Payment Due */}
          <div>
            <p className="text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
              Payment Due
            </p>
            <p className="text-[#0C0E16] dark:text-white font-leagueSpartan text-[15px] sm:text-base font-bold">
              {invoice?.paymentTerms}
            </p>
          </div>

          {/* Bill To */}
          <div>
            <p className="text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
              Bill To
            </p>
            <p className="text-[#0C0E16] dark:text-white font-leagueSpartan text-[15px] sm:text-base font-bold mb-1">
              {invoice?.clientName}
            </p>
            <p className="text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium leading-relaxed">
              {invoice?.to_streetAddress}<br />
              {invoice?.to_city}<br />
              {invoice?.to_postcode}<br />
              {invoice?.to_country}
            </p>
          </div>
        </div>

        {/* Sent To */}
        <div className="mb-6 sm:mb-8">
          <p className="text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
            Sent to
          </p>
          <p className="text-[#0C0E16] dark:text-white font-leagueSpartan text-[15px] sm:text-base font-bold">
            {invoice?.clientEmail}
          </p>
        </div>

        {/* Items Table */}
        <div className="bg-[#F9FAFE] dark:bg-gray-900 rounded-t-lg overflow-hidden">
          {/* Table Header - Hidden on mobile, visible on sm+ */}
          <div className="hidden sm:grid grid-cols-12 gap-4 p-4 sm:p-6 bg-[#F9FAFE] dark:bg-gray-900">
            <p className="col-span-5 text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium">
              Item Name
            </p>
            <p className="col-span-2 text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium text-center">
              QTY.
            </p>
            <p className="col-span-2 text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium text-right">
              Price
            </p>
            <p className="col-span-3 text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium text-right">
              Total
            </p>
          </div>

          {/* Table Items */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {invoice?.itemList.map((item, index) => (
              <div key={index} className="p-4 sm:p-6">
                {/* Desktop Layout */}
                <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                  <p className="col-span-5 text-[#0C0E16] dark:text-white font-leagueSpartan text-[15px] font-bold">
                    {item.itemName}
                  </p>
                  <p className="col-span-2 text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[15px] font-bold text-center">
                    {item.qty}
                  </p>
                  <p className="col-span-2 text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[15px] font-bold text-right">
                    £ {item.price.toFixed(2)}
                  </p>
                  <p className="col-span-3 text-[#0C0E16] dark:text-white font-leagueSpartan text-[15px] font-bold text-right">
                    £ £ {(item.qty * item.price).toFixed(2)}
                  </p>
                </div>

                {/* Mobile Layout */}
                <div className="sm:hidden flex justify-between items-center">
                  <div>
                    <p className="text-[#0C0E16] dark:text-white font-leagueSpartan text-[15px] font-bold mb-2">
                      {item.itemName}
                    </p>
                    <p className="text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium">
                      {item.qty} x £ {item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-[#0C0E16] dark:text-white font-leagueSpartan text-[15px] font-bold">
                    £ £ {(item.qty * item.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="bg-[#373B53] dark:bg-gray-900 p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <p className="text-white font-leagueSpartan text-[13px] font-medium">
              Amount Due
            </p>
            <p className="text-white font-leagueSpartan text-xl sm:text-2xl md:text-3xl font-bold">
              £{total}
            </p>
          </div>
        </div>
      </div>
      {/* Add padding bottom on mobile to account for fixed buttons */}
      <div className="sm:hidden h-20"></div>

      <Modal
        isOpen={open}
        invoiceId='ppooopp'
        onCancel={() => setIsOpen(false)}
        onConfirm={onConfirm} />
    </div>
  );
}
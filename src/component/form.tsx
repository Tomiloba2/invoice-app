import { useFieldArray, useForm } from 'react-hook-form';
import { invoiceSchema } from '../schema/invoice';
import type { TInvoice } from "../schema/invoice"
import { zodResolver } from '@hookform/resolvers/zod';
import { createRecord } from '../schema/db';

export default function Form({ onClose }: { onClose: () => void }) {
    const { reset, control, register, handleSubmit, watch, setValue, formState: { errors, isValid, isSubmitting } } = useForm<TInvoice>({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            from_streetAddress: "",
            from_city: "",
            from_postcode: "",
            from_country: "",
            to_streetAddress: "",
            to_city: "",
            to_postcode: "",
            to_country: "",
            clientName: "",
            clientEmail: "",
            invoiceDate: "",//new Date().toISOString().split("T")[0] as unknown as Date,
            projectDescription: "",
            paymentTerms: "Net 1 Day",
            itemList: [{
                itemName: "",
                qty: 1,
                price: 0
            }]
        }
    })
    console.log(errors.itemList);
    
    const { append, remove, fields: itemLists } = useFieldArray({ control, name: "itemList" })
    const items: any = watch('itemList')
    const paymentTermsOptions = ["Net 1 Day", "Net 7 Days", "Net 14 Days", "Net 30 Days"];
    const onSubmit = (data: TInvoice) => {
        const item: any = data.itemList
        const totalAmount = item.reduce(
            (sum: any, item: any) => sum + item.qty * item.price,
            0
        );

        createRecord({
            ...data,
            status: "pending",
            amount: totalAmount
        });
        reset()
        onClose()
    }
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">

                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-[#0C0E16] dark:text-white font-leagueSpartan text-xl sm:text-2xl md:text-3xl font-bold tracking-[-0.0208em]">
                        {/*  Edit #{formData.id || "XM9141"} */}
                    </h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                    {/* Bill From Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
                        <h2 className="text-[#7C5DFA] font-leagueSpartan text-[15px] font-bold mb-4 sm:mb-6">
                            Bill From
                        </h2>
                        <div className="space-y-4 sm:space-y-5">
                            <div>
                                <label className="block text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
                                    Street Address
                                </label>
                                <input
                                    {...register("from_streetAddress")}
                                    placeholder='street address'
                                    className="w-full px-4 py-3 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA] transition-all"
                                />
                                {errors.from_streetAddress && <p className="text-xs text-destructive mt-1">{errors.from_streetAddress.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                                <div>
                                    <label className="block text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
                                        City
                                    </label>
                                    <input
                                        {...register("from_city")}
                                        className="w-full px-4 py-3 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA]"
                                    />
                                    {errors.from_city && <p className="text-xs text-destructive mt-1">{errors.from_city.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
                                        Post Code
                                    </label>
                                    <input
                                        {...register("from_postcode")}
                                        className="w-full px-4 py-3 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA]"
                                    />
                                    {errors.from_postcode && <p className="text-xs text-destructive mt-1">{errors.from_postcode.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
                                        Country
                                    </label>
                                    <input
                                        {...register("from_country")}
                                        className="w-full px-4 py-3 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA]"
                                    />
                                    {errors.from_country && <p className="text-xs text-destructive mt-1">{errors.from_country.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bill To Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
                        <h2 className="text-[#7C5DFA] font-leagueSpartan text-[15px] font-bold mb-4 sm:mb-6">
                            Bill To
                        </h2>
                        <div className="space-y-4 sm:space-y-5">
                            <div>
                                <label className="block text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
                                    Client's Name
                                </label>
                                <input
                                    {...register("clientName")}
                                    className="w-full px-4 py-3 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA]"
                                />
                                {errors.clientName && <p className="text-xs text-destructive mt-1">{errors.clientName.message}</p>}
                            </div>

                            <div>
                                <label className="block text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
                                    Client's Email
                                </label>
                                <input
                                    {...register("clientEmail")}
                                    className="w-full px-4 py-3 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA]"
                                />
                                {errors.clientEmail && <p className="text-xs text-destructive mt-1">{errors.clientEmail.message}</p>}
                            </div>

                            <div>
                                <label className="block text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
                                    Street Address
                                </label>
                                <input
                                    {...register("to_streetAddress")}
                                    className="w-full px-4 py-3 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA]"
                                />
                                {errors.to_streetAddress && <p className="text-xs text-destructive mt-1">{errors.to_streetAddress.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                                <div>
                                    <label className="block text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
                                        City
                                    </label>
                                    <input
                                        {...register("to_city")}
                                        className="w-full px-4 py-3 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA]"
                                    />
                                    {errors.to_city && <p className="text-xs text-destructive mt-1">{errors.to_city.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
                                        Post Code
                                    </label>
                                    <input
                                        {...register("to_postcode")}
                                        className="w-full px-4 py-3 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA]"
                                    />
                                    {errors.to_postcode && <p className="text-xs text-destructive mt-1">{errors.to_postcode.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
                                        Country
                                    </label>
                                    <input
                                        {...register("to_country")}
                                        className="w-full px-4 py-3 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA]"
                                    />
                                    {errors.to_country && <p className="text-xs text-destructive mt-1">{errors.to_country.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Invoice Details Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                                <label className="block text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
                                    Invoice Date
                                </label>
                                <input
                                    {...register("invoiceDate")}
                                    type='date'
                                    className="w-full px-4 py-3 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA]"
                                />
                                {errors.invoiceDate && <p className="text-xs text-destructive mt-1">{errors.invoiceDate.message}</p>}
                            </div>

                            <div>
                                <label className="block text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
                                    Payment Terms
                                </label>
                                <select
                                    value={watch("paymentTerms")}
                                    onChange={(e) => setValue('paymentTerms', e.target.value)}
                                    className="w-full px-4 py-3 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA] appearance-none"
                                >
                                    {paymentTermsOptions.map(term => (
                                        <option key={term} value={term}>{term}</option>
                                    ))}
                                </select>
                                {errors.paymentTerms && <p className="text-xs text-destructive mt-1">{errors.paymentTerms.message}</p>}
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-5">
                            <label className="block text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium mb-2">
                                Project / Description
                            </label>
                            <input
                                {...register("projectDescription")}
                                className="w-full px-4 py-3 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA]"
                            />
                            {errors.projectDescription && <p className="text-xs text-destructive mt-1">{errors.projectDescription.message}</p>}
                        </div>
                    </div>

                    {/* Items Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
                        <h2 className="text-[#777F98] dark:text-gray-400 font-leagueSpartan text-lg font-bold mb-4 sm:mb-6">
                            Item List
                        </h2>

                        {/* Table Headers - Hidden on mobile */}
                        <div className="hidden md:grid grid-cols-12 gap-3 mb-3 px-2">
                            <p className="col-span-5 text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium">Item Name</p>
                            <p className="col-span-2 text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium">Qty.</p>
                            <p className="col-span-2 text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium">Price</p>
                            <p className="col-span-2 text-[#7E88C3] dark:text-gray-400 font-leagueSpartan text-[13px] font-medium">Total</p>
                            <p className="col-span-1"></p>
                        </div>

                        {/* Items List */}
                        <div className="space-y-4">
                            {itemLists.map((_, index) => (
                                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                                    {/* Desktop Layout */}
                                    <div className=" md:grid grid-cols-12 gap-3 items-center">
                                        <input
                                            {...register(`itemList.${index}.itemName`)}
                                            className="col-span-5 px-3 py-2 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA]"
                                        />
                                        <input
                                            {...register(`itemList.${index}.qty`)}
                                            className="col-span-2 px-3 py-2 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA]"
                                        />
                                        <input
                                            {...register(`itemList.${index}.price`)}
                                            className="col-span-2 px-3 py-2 rounded border border-[#DFE3FA] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA]"
                                        />
                                        <p className="col-span-2 text-[#0C0E16] dark:text-white font-bold">
                                            £ {(items[index]?.qty * items[index]?.price || 0).toFixed(2)}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="col-span-1 text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>

                        {/* Add New Item Button */}
                        <button
                            type="button"
                            onClick={() => append({
                                qty: 1, itemName: "", price: 0
                            })}
                            className="w-full mt-4 py-3 rounded-3xl bg-[#F9FAFE] dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#7E88C3] dark:text-gray-300 font-leagueSpartan text-[15px] font-bold transition-colors"
                        >
                            + Add New Item
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                            <button
                                type="button"
                                className="px-6 py-3 rounded-3xl bg-[#F9FAFE] dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#7E88C3] dark:text-gray-300 font-leagueSpartan text-[15px] font-bold transition-colors sm:order-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-3xl bg-[#7C5DFA] hover:bg-[#9277FF] text-white font-leagueSpartan text-[15px] font-bold transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
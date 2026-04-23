import z from "zod"

export const invoiceSchema = z.object({
    from_streetAddress: z.string().min(4, "street address is required"),
    from_city: z.string().min(4, "city is required"),
    from_postcode: z.string().min(4, "postal code is required"),
    from_country: z.string().min(4, "country is required"),
    to_streetAddress: z.string().min(4, "street address is required"),
    to_city: z.string().min(4, "city is required"),
    to_postcode: z.string().min(4, "postal code is required"),
    to_country: z.string().min(4, "country is required"),
    clientName: z.string().min(4, "client name is required"),
    clientEmail: z.email("email is required"),
    invoiceDate: z
        .string()
        .min(1, "Date is required")                        
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date",                        
        }),
    projectDescription: z.string().min(4, "project description is required"),
    paymentTerms: z.string().min(4, "payment terms is required"),
    itemList: z.array(z.object({
        itemName: z.string().min(4, "item name is required"),
        qty: z.coerce.number("quantity is required"),
        price: z.coerce.number()
    }))
})

export type TInvoice = z.input<typeof invoiceSchema>
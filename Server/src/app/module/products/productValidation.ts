import { z } from "zod";

// Zod Validation Schema
export const productValidationSchema = z.object(
    {
        body: z.object({
            name: z.string({ required_error: 'Name field is required' }),
            image: z.string().optional(),
            price: z.number({ required_error: 'Price field is required' }).nonnegative(),
            category: z.string({ required_error: 'Category is required' }),
            description: z.string({ required_error: 'Description field is required' }),
            quantity: z.number({ required_error: 'Quantity field is required' }).nonnegative(),
            expireDate: z.coerce.date({ required_error: 'Expire Date is required' }),
            manufacturerDetails: z.string({ required_error: 'Manufacturer Details is required' }),
        })
    }
);
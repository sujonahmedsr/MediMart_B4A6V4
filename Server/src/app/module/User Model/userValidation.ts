import z from 'zod'
const userValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name must be provided and must be a string" }),
        email: z.string({ required_error: "Email must be provided and must be a string" }).email(),
        password: z.string({ required_error: "Strong Password must be provided" })
    })
})

const userLoginValidation = z.object({
    body: z.object({
        email: z.string({ required_error: "Email must be provided and must be a string" }).email(),
        password: z.string({ required_error: "Strong Password must be provided" })
    })
})


export const userValidation = {
    userValidationSchema,
    userLoginValidation
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

export const allCategories = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`)
        const result = res.json()
        return result
    } catch (error: any) {
        throw new Error(error?.message)
    }
}